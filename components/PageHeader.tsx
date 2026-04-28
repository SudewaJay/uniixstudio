import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
};

export default function PageHeader({ eyebrow, title, lede }: Props) {
  return (
    <section className="pt-40 pb-16 md:pt-48 md:pb-20 relative overflow-hidden">
      <div className="hero-grid-bg" />
      <div className="wrap relative">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={1}>
          <h1
            className="display mt-5"
            style={{ fontSize: "clamp(48px,8vw,112px)" }}
          >
            {title}
          </h1>
        </Reveal>
        {lede && (
          <Reveal delay={2}>
            <p className="text-[clamp(17px,1.4vw,20px)] text-ink-2 max-w-[60ch] leading-[1.55] mt-8">
              {lede}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
