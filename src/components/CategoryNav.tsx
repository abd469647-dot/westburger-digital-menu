import { useCallback, useEffect, useRef, type ReactNode } from "react";

/**
 * Horizontal, scrollable category rail. Keeps the existing chip styling and
 * only improves scrolling: vertical wheel scrolls sideways, and the rail can be
 * dragged with the mouse without breaking clicks on the chips.
 */
export function CategoryNav({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const next = el.scrollLeft + event.deltaY;
      if ((next <= 0 && event.deltaY < 0) || (next >= max && event.deltaY > 0)) return;
      event.preventDefault();
      el.scrollLeft = next;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft, moved: false };
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLUListElement>) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - delta;
  }, []);

  const endDrag = useCallback(() => {
    drag.current.active = false;
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
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
      className="flex gap-2 overflow-x-auto overscroll-x-contain wb-scrollbar-none max-w-full"
      style={{ touchAction: "pan-x pan-y" }}
    >
      {children}
    </ul>
  );
}
