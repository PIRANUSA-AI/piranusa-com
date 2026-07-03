/**
 * ImageSectionTwo
 *
 * Second full-width image band (image-section-2.svg). Decorative only —
 * mirrors the StickyImageReveal sizing so the two bands read as a matched
 * pair, but this one is a plain (non-pinned) band.
 */
export function ImageSectionTwo() {
  return (
    <section aria-hidden="true" className="relative">
      <div className="h-[42vh] overflow-hidden md:h-[58vh]">
        <img
          src="/images/image-section-2.svg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}
