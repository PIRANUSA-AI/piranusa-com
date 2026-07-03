/**
 * StickyImageReveal
 *
 * Sticky-pin scroll effect: the image stays pinned in the viewport while the
 * NEXT section scrolls up and covers it. Pure CSS — the image sits in a
 * `sticky top-0` layer (z-0); the section rendered after this one must be
 * opaque and `relative z-10` so it rises over the pinned image as you scroll.
 *
 * Banner asset is 1920×580 (≈3.3:1). Height is clamped per breakpoint so the
 * pin reads as a fixed band, not a full-screen takeover.
 */
export function StickyImageReveal() {
  return (
    <section aria-hidden="true" className="relative z-0">
      <div className="sticky top-0 h-[42vh] overflow-hidden md:h-[58vh]">
        <img
          src="/images/image-section-1.svg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}
