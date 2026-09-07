import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Horizontal, scrollable category rail. Keeps the existing chip styling and
 * only improves scrolling: vertical wheel scrolls sideways, and the rail can be
 * dragged with the mouse without breaking clicks on the chips.
 */
export function CategoryNav({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, pointerId: -1, startX: 0, startScroll: 0, moved: false });
  const [grabbing, setGrabbing] = useState(false);

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

  const onClickCapture = useCallback((event: React.MouseEvent<HTMLUListElement>) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  }, []);

  return (
    <ul
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      onDragStart={(event) => event.preventDefault()}
      className={`flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain wb-scrollbar-none max-w-full [&>li]:shrink-0 ${
        grabbing ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
      style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
    >
      {children}
    </ul>
  );
}
