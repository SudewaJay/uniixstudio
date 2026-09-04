/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Brand orange ramp.
         *
         * 1–4 are the *display* tints — bright, saturated, used for large
         * decorative fills, glows and gradients. They do NOT have enough
         * contrast for text on a light surface.
         *
         * `ink` / `deep` are the *text-safe* tints. Use these for any orange
         * text, link or icon that sits on cream/white:
         *   brand-ink  #BF4508 → 4.94:1 on cream, 5.16:1 white-on-it (AA)
         * On dark surfaces use brand-2 (#F5A623 → 9.37:1 on ink).
         */
        brand: {
          1: "#F8C84A",
          2: "#F5A623",
          3: "#F07B20",
          4: "#E8621A",
          ink: "#BF4508",
          deep: "#A33A06",
        },
        bg: {
          DEFAULT: "#FBFAF6",
          warm: "#FFF6EB",
          paper: "#FFFFFF",
          ink: "#12100E",
          "ink-2": "#1C1815",
        },
        ink: {
          DEFAULT: "#12100E",
          2: "#3A342D",
          mute: "#5C554D",
        },
        line: {
          DEFAULT: "rgba(18,16,14,.12)",
          soft: "rgba(18,16,14,.07)",
          dark: "rgba(255,255,255,.14)",
          "dark-soft": "rgba(255,255,255,.08)",
        },
      },
      fontFamily: {
        // Google Sans Flex — see :root --font-display in globals.css for the
        // full fallback stack (sans, not serif: the face is a geometric sans).
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      /**
       * Spacing scale — restricted to the design system's step set so section
       * padding and gaps stay on-system. Tailwind's default numeric scale is
       * still available; these are the named steps to reach for first.
       */
      spacing: {
        "s-1": "8px",
        "s-2": "16px",
        "s-3": "24px",
        "s-4": "32px",
        "s-5": "48px",
        "s-6": "64px",
        "s-7": "80px",
        "s-8": "96px",
        "s-9": "120px",
      },
      backgroundImage: {
        // Bright ramp — decorative fills and dark-surface text only.
        "brand-grad":
          "linear-gradient(135deg,#F8C84A 0%,#F5A623 35%,#F07B20 70%,#E8621A 100%)",
        // Text-safe ramp — passes 3:1 at its lightest stop, for LARGE text
        // (>=24px) on cream/white. Never use under 24px.
        "accent-grad": "linear-gradient(135deg,#D9540B 0%,#A33A06 100%)",
        "brand-grad-soft":
          "linear-gradient(135deg,rgba(248,200,74,.08),rgba(232,98,26,.08))",
      },
      borderRadius: {
        sm2: "10px",
        DEFAULT: "16px",
        lg2: "24px",
        xl2: "32px",
      },
      boxShadow: {
        sm2: "0 1px 2px rgba(18,16,14,.04), 0 8px 24px -12px rgba(18,16,14,.08)",
        soft: "0 2px 4px rgba(18,16,14,.04), 0 24px 60px -24px rgba(191,69,8,.18)",
        lift: "0 24px 70px -28px rgba(18,16,14,.34)",
      },
      transitionTimingFunction: {
        // Single house easing — used by every transition in the system.
        uniix: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        std: "400ms",
        reveal: "650ms",
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        pulse2: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".55" },
        },
      },
      animation: {
        scroll: "scroll 42s linear infinite",
        pulse2: "pulse2 2.4s ease infinite",
      },
    },
  },
  plugins: [],
};
