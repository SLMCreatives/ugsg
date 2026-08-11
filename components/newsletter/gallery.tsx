"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SectionImage, SectionPlaceholder } from "@/lib/newsletter/types";

interface GalleryProps {
  images: SectionImage[];
  /** Default caption for slides that do not set their own. */
  caption: string;
  placeholder: SectionPlaceholder;
  /** Used to label the gallery for screen readers. */
  label: string;
}

/**
 * Swipeable photo gallery.
 *
 * Built on CSS scroll-snap rather than a carousel library: swiping is native
 * (so it keeps momentum scrolling on touch), it works before hydration, and it
 * needs no extra dependency. The script only adds the arrows, dots, and the
 * caption that tracks the current slide.
 */
export function Gallery({ images, caption, placeholder, label }: GalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Mirror of `active` that is readable synchronously. The arrows must not
  // derive the next slide from state, or a smooth scroll still in flight
  // leaves them computing from a stale index and they stop advancing.
  const activeRef = useRef(0);

  const count = images.length;
  const isGallery = count > 1;

  const setActiveIndex = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;

      const clamped = Math.max(0, Math.min(count - 1, index));
      // Update the controls immediately, then let the scroll catch up.
      setActiveIndex(clamped);

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      track.scrollTo({
        left: clamped * track.clientWidth,
        behavior: reduced ? "auto" : "smooth"
      });
    },
    [count, setActiveIndex]
  );

  const step = useCallback(
    (delta: number) => goTo(activeRef.current + delta),
    [goTo]
  );

  // Keep the controls in step with swiping, which moves the track directly.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isGallery) return;

    const onScroll = () => {
      if (track.clientWidth === 0) return;
      const index = Math.max(
        0,
        Math.min(count - 1, Math.round(track.scrollLeft / track.clientWidth))
      );
      if (index !== activeRef.current) setActiveIndex(index);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [count, isGallery, setActiveIndex]);

  // No photos supplied yet — show the briefing frame.
  if (count === 0) {
    return (
      <figure className="visual">
        <div className="gallery-frame">
          <div className="photo-placeholder">
            <div>
              {placeholder.label}
              <small>{placeholder.brief}</small>
            </div>
          </div>
        </div>
        <figcaption className="caption">{caption}</figcaption>
      </figure>
    );
  }

  const current = images[active] ?? images[0];

  return (
    <figure className="visual">
      <div
        className="gallery"
        role={isGallery ? "group" : undefined}
        aria-roledescription={isGallery ? "carousel" : undefined}
        aria-label={isGallery ? `${label} — ${count} photos` : undefined}
      >
        <div
          className="gallery-frame"
          ref={trackRef}
          tabIndex={isGallery ? 0 : undefined}
        >
          {images.map((image, i) => (
            <div
              className="gallery-slide"
              key={image.src}
              role={isGallery ? "group" : undefined}
              aria-roledescription={isGallery ? "slide" : undefined}
              aria-label={isGallery ? `${i + 1} of ${count}` : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className={image.fit === "contain" ? "contain" : undefined}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        {isGallery && (
          <>
            <button
              type="button"
              className="gallery-arrow prev"
              onClick={() => step(-1)}
              disabled={active === 0}
              aria-label="Previous photo"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              className="gallery-arrow next"
              onClick={() => step(1)}
              disabled={active === count - 1}
              aria-label="Next photo"
            >
              <span aria-hidden="true">›</span>
            </button>
            <p className="gallery-counter" aria-hidden="true">
              {active + 1} / {count}
            </p>
          </>
        )}
      </div>

      {isGallery && (
        <div className="gallery-dots">
          {images.map((image, i) => (
            <button
              type="button"
              key={image.src}
              className={i === active ? "dot active" : "dot"}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === active}
            />
          ))}
        </div>
      )}

      {/* aria-live so the caption change is announced when slides move. */}
      <figcaption className="caption" aria-live="polite">
        {current.caption ?? caption}
      </figcaption>
    </figure>
  );
}
