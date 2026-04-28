import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] grid place-items-center pt-32 pb-24">
      <div className="wrap text-center max-w-[640px]">
        <div
          className="font-display font-bold gradient-text leading-none"
          style={{ fontSize: "clamp(120px,18vw,220px)", letterSpacing: "-0.04em" }}
        >
          404
        </div>
        <h1
          className="display mt-4 mb-6"
          style={{ fontSize: "clamp(32px,4vw,48px)" }}
        >
          We couldn&apos;t find{" "}
          <span className="italic-display">that page.</span>
        </h1>
        <p className="text-ink-2 text-[16px] leading-[1.6] max-w-[44ch] mx-auto mb-8">
          The link might be broken, or the page may have moved. Either way, let&apos;s
          get you back on track.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn btn-primary">
            Back to home ↗
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
