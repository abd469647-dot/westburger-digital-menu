import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type CategoryNavItem = { id: string; name: string };

/**
 * Horizontal, scrollable category rail. Keeps the existing chip styling and
 * only improves scrolling: vertical wheel scrolls sideways, and the rail can be
 * dragged with the mouse without breaking clicks on the chips. It also tracks
 * the section currently in view and highlights the matching chip.
 */
export function CategoryNav({ items }: { items: CategoryNavItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, pointerId: -1, startX: 0, startScroll: 0, moved: false });
  const [grabbing, setGrabbing] = useState(false);
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const [active, setActive] = useState<string>(ids[0] ?? "");
  // While a click-triggered smooth scroll is running, ignore observer updates.
  const lockedTo = useRef<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) return;
      // Trackpads send deltaX; mouse wheels send deltaY — use whichever dominates.
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontal ? event.deltaX : event.deltaY;
      if (delta === 0) return;
      const current = el.scrollLeft;
      if ((current <= 0 && delta < 0) || (current >= max - 1 && delta > 0)) return;
      if (!horizontal) event.preventDefault();
      el.scrollLeft = current + delta;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Track which section is currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        const inView = ids.filter((id) => visible.has(id));
        if (!inView.length) return;
        const next = inView[0]!;
        if (lockedTo.current) {
          if (lockedTo.current === next) lockedTo.current = null;
          return;
        }
        setActive(next);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  // Keep the active chip visible inside the rail.
  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const chip = el.querySelector<HTMLElement>(`[data-category="${active}"]`);
    if (!chip) return;
    const left = chip.offsetLeft;
    const right = left + chip.offsetWidth;
    const viewLeft = el.scrollLeft;
    const viewRight = viewLeft + el.clientWidth;
    if (left < viewLeft + 16) {
      el.scrollTo({ left: Math.max(0, left - 24), behavior: "smooth" });
    } else if (right > viewRight - 16) {
      el.scrollTo({ left: right - el.clientWidth + 24, behavior: "smooth" });
    }
  }, [active]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = ref.current;
    if (!el || el.scrollWidth - el.clientWidth <= 1) return;
    drag.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(event.pointerId);
    setGrabbing(true);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLUListElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - delta;
  }, []);

  const endDrag = useCallback((event: React.PointerEvent<HTMLUListElement>) => {
    const el = ref.current;
    if (!drag.current.active) return;
    drag.current.active = false;
    setGrabbing(false);
    if (el?.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
  }, []);

  const onChipClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      event.preventDefault();
      return;
    }
    const section = document.getElementById(id);
    if (!section) return;
    event.preventDefault();
    lockedTo.current = id;
    setActive(id);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.history.replaceState) window.history.replaceState(null, "", `#${id}`);
  }, []);

  return (
    <ul
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDragStart={(event) => event.preventDefault()}
      className={`flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain wb-scrollbar-none max-w-full [&>li]:shrink-0 ${
        grabbing ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-category={item.id}
              aria-current={isActive ? "true" : undefined}
              onClick={(event) => onChipClick(event, item.id)}
              className={`inline-block whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                isActive
                  ? "border-yellow bg-yellow text-foreground shadow-sm"
                  : "border-foreground/15 bg-cream/70 text-foreground/80 hover:bg-yellow hover:border-yellow"
              }`}
            >
              {item.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
