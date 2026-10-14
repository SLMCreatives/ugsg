"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export interface WheelItem {
  value: string;
  label: string;
  emoji?: string;
  sub?: string;
}

interface WheelPickerProps {
  id: string;
  label: string;
  items: WheelItem[];
  /** Single mode: the picked value (undefined until the student chooses). */
  value?: string;
  /** Multi mode: every picked value. Tapping an item toggles it. */
  selected?: string[];
  multi?: boolean;
  /** Single: commit this value. Multi: toggle this value. */
  onPick: (value: string) => void;
  /** Where the wheel rests before anything is picked. */
  restIndex?: number;
  itemHeight?: number;
  visibleRows?: number;
}

// Momentum scrolling keeps firing scroll events after the finger lifts; the
// wheel counts as "settled" once they stop for this long.
const SETTLE_MS = 140;

/**
 * Vertical, snap-scrolling picker (think iOS date wheel). Students swipe up and
 * down; whichever item rests in the centre band is the answer. Tapping an item
 * also picks it and spins it into the band.
 */
export function WheelPicker({
  id,
  label,
  items,
  value,
  selected = [],
  multi = false,
  onPick,
  restIndex = 0,
  itemHeight = 60,
  visibleRows = 5
}: WheelPickerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frame = useRef(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touching = useRef(false);
  const userDriven = useRef(false);
  const lastTick = useRef(-1);

  const valueIndex = value === undefined ? -1 : items.findIndex((i) => i.value === value);
  const [centre, setCentre] = useState(valueIndex >= 0 ? valueIndex : restIndex);
  const centreRef = useRef(centre);

  const pad = ((visibleRows - 1) / 2) * itemHeight;

  const indexAt = useCallback(
    (scrollTop: number) =>
      Math.max(0, Math.min(items.length - 1, Math.round(scrollTop / itemHeight))),
    [items.length, itemHeight]
  );

  // Tilt and fade items by their distance from the centre band.
  const paint = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const mid = el.scrollTop / itemHeight;
    itemRefs.current.forEach((node, i) => {
      if (!node) return;
      const d = i - mid;
      const abs = Math.min(Math.abs(d), 3);
      node.style.transform = `rotateX(${(-d * 17).toFixed(2)}deg) scale(${(1 - abs * 0.07).toFixed(3)})`;
      node.style.opacity = String(Math.max(0.18, 1 - abs * 0.3));
    });
  }, [itemHeight]);

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      scrollerRef.current?.scrollTo({
        top: index * itemHeight,
        behavior: smooth ? "smooth" : "auto"
      });
    },
    [itemHeight]
  );

  // Land on the current answer (or the resting spot) before first paint.
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = centreRef.current * itemHeight;
    paint();
    // Only on mount — later moves are driven by scrolling or by `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Answers can also change from outside (keyboard shortcuts) — follow them.
  useEffect(() => {
    if (multi || valueIndex < 0 || userDriven.current) return;
    if (valueIndex !== centreRef.current) scrollToIndex(valueIndex);
  }, [multi, valueIndex, scrollToIndex]);

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    []
  );

  const settle = useCallback(() => {
    if (touching.current) return;
    const el = scrollerRef.current;
    if (!el) return;
    const index = indexAt(el.scrollTop);
    if (userDriven.current && !multi && items[index].value !== value) {
      onPick(items[index].value);
    }
    userDriven.current = false;
  }, [indexAt, items, multi, onPick, value]);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(paint);

    const el = scrollerRef.current;
    if (!el) return;
    const index = indexAt(el.scrollTop);
    if (index !== centreRef.current) {
      centreRef.current = index;
      setCentre(index);
      if (userDriven.current && index !== lastTick.current) {
        lastTick.current = index;
        // A tiny click per notch on phones that support it.
        navigator.vibrate?.(6);
      }
    }

    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(settle, SETTLE_MS);
  }, [indexAt, paint, settle]);

  const markUser = () => {
    userDriven.current = true;
  };

  const tapItem = (index: number) => {
    userDriven.current = false;
    navigator.vibrate?.(10);
    onPick(items[index].value);
    scrollToIndex(index);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (step) {
      event.preventDefault();
      const next = Math.max(0, Math.min(items.length - 1, centreRef.current + step));
      if (!multi) onPick(items[next].value);
      scrollToIndex(next);
      return;
    }
    if (multi && event.key === " ") {
      event.preventDefault();
      onPick(items[centreRef.current].value);
    }
  };

  const centreItem = items[centre];
  const picked = multi ? selected.includes(centreItem?.value) : valueIndex === centre;

  return (
    <div
      className={`wheel ${multi ? "is-multi" : ""} ${picked ? "is-picked" : ""}`}
      style={
        {
          "--wheel-item-h": `${itemHeight}px`,
          "--wheel-rows": visibleRows
        } as React.CSSProperties
      }
    >
      <div className="wheel-band" aria-hidden="true" />
      <div
        ref={scrollerRef}
        className="wheel-scroller"
        role="listbox"
        tabIndex={0}
        aria-label={label}
        aria-multiselectable={multi || undefined}
        aria-activedescendant={`${id}-opt-${centre}`}
        onScroll={onScroll}
        onTouchStart={() => {
          touching.current = true;
          markUser();
        }}
        onTouchEnd={() => {
          touching.current = false;
          if (settleTimer.current) clearTimeout(settleTimer.current);
          settleTimer.current = setTimeout(settle, SETTLE_MS);
        }}
        onWheel={markUser}
        onPointerDown={markUser}
        onKeyDown={onKeyDown}
      >
        <div style={{ height: pad }} aria-hidden="true" />
        {items.map((item, index) => {
          const isOn = multi ? selected.includes(item.value) : item.value === value;
          return (
            <button
              key={item.value}
              id={`${id}-opt-${index}`}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              role="option"
              aria-selected={isOn}
              tabIndex={-1}
              className={`wheel-item ${index === centre ? "is-centre" : ""} ${isOn ? "is-on" : ""}`}
              onClick={() => tapItem(index)}
            >
              {item.emoji ? <span className="wheel-emoji">{item.emoji}</span> : null}
              <span className="wheel-text">
                <span className="wheel-label">{item.label}</span>
                {item.sub ? <span className="wheel-sub">{item.sub}</span> : null}
              </span>
              {multi ? (
                <span className="wheel-check" aria-hidden="true">
                  {isOn ? "✓" : "+"}
                </span>
              ) : null}
            </button>
          );
        })}
        <div style={{ height: pad }} aria-hidden="true" />
      </div>
    </div>
  );
}
