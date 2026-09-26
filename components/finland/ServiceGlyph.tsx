import type { FinlandServiceVisual } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * Small line-drawn visual per service card. Pure SVG; each animates only on
 * hover/focus of the parent card (CSS, see `.glyph*` in finland.module.css).
 */
export default function ServiceGlyph({ kind }: { kind: FinlandServiceVisual }) {
  return (
    <svg
      viewBox="0 0 160 96"
      className={styles.glyph}
      aria-hidden="true"
      fill="none"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "presence" && (
        <>
          <rect x="14" y="10" width="132" height="76" rx="6" className={styles.gLine} />
          <path d="M14 22h132" className={styles.gLine} />
          <circle cx="22" cy="16" r="1.6" className={styles.gFill} />
          <circle cx="28" cy="16" r="1.6" className={styles.gFill} />
          <rect x="24" y="32" width="58" height="8" rx="2" className={styles.gAccent} />
          <rect x="24" y="46" width="40" height="4" rx="2" className={styles.gFill} />
          <rect x="24" y="62" width="26" height="10" rx="5" className={styles.gSolid} />
          <rect x="92" y="30" width="44" height="46" rx="4" className={`${styles.gLine} ${styles.gShift}`} />
        </>
      )}
      {kind === "product" && (
        <>
          <rect x="14" y="10" width="132" height="76" rx="6" className={styles.gLine} />
          <path d="M44 10v76" className={styles.gLine} />
          <rect x="22" y="20" width="14" height="4" rx="2" className={styles.gFill} />
          <rect x="22" y="30" width="14" height="4" rx="2" className={styles.gFill} />
          <rect x="22" y="40" width="14" height="4" rx="2" className={styles.gFill} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={56 + i * 17}
              y={40}
              width="9"
              height="36"
              rx="2"
              className={`${styles.gBar} ${i === 3 ? styles.gAccent : styles.gSolidSoft}`}
              style={{ transitionDelay: `${i * 50}ms`, ["--h" as string]: `${0.35 + ((i * 37) % 60) / 100}` }}
            />
          ))}
          <rect x="56" y="20" width="44" height="6" rx="2" className={styles.gFill} />
        </>
      )}
      {kind === "engineering" && (
        <>
          <rect x="60" y="8" width="40" height="18" rx="4" className={styles.gLine} />
          <rect x="16" y="70" width="36" height="18" rx="4" className={styles.gLine} />
          <rect x="62" y="70" width="36" height="18" rx="4" className={styles.gAccentLine} />
          <rect x="108" y="70" width="36" height="18" rx="4" className={styles.gLine} />
          <path d="M80 26v18M34 70V52h92v18M80 44v26" className={`${styles.gLine} ${styles.gDash}`} />
          <circle cx="80" cy="44" r="3" className={styles.gSolid} />
        </>
      )}
      {kind === "ai" && (
        <>
          {[
            [30, 24], [30, 48], [30, 72],
            [80, 36], [80, 60],
            [130, 48],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 5 ? 6 : 4} className={i === 5 ? styles.gSolid : styles.gLine} />
          ))}
          <path
            d="M34 24L76 36M34 24L76 60M34 48L76 36M34 48L76 60M34 72L76 36M34 72L76 60M84 36L124 48M84 60L124 48"
            className={`${styles.gLine} ${styles.gDash}`}
          />
          <circle cx="80" cy="36" r="4" className={`${styles.gAccent} ${styles.gPulse}`} />
        </>
      )}
      {kind === "growth" && (
        <>
          <path d="M14 86h132M14 10v76" className={styles.gLine} />
          <path d="M14 62h132M14 38h132" className={styles.gGrid} />
          <path
            d="M18 78 L46 70 L70 72 L96 52 L118 44 L142 18"
            pathLength={1}
            className={`${styles.gAccentLine} ${styles.gDraw}`}
          />
          <circle cx="142" cy="18" r="3.2" className={styles.gSolid} />
        </>
      )}
      {kind === "brand" && (
        <>
          <circle cx="58" cy="48" r="28" className={styles.gLine} />
          <rect x="74" y="20" width="56" height="56" rx="6" className={`${styles.gAccentLine} ${styles.gSpin}`} />
          <circle cx="58" cy="48" r="6" className={styles.gSolid} />
          <path d="M14 90h40M62 90h20M90 90h56" className={styles.gGrid} />
        </>
      )}
    </svg>
  );
}
