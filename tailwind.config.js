/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          1: "#F8C84A",
          2: "#F5A623",
          3: "#F07B20",
          4: "#E8621A",
        },
        bg: {
          DEFAULT: "#FBFAF6",
          warm: "#FFF6EB",
          paper: "#FFFFFF",
          ink: "#0E0A06",
        },
        ink: {
          DEFAULT: "#1A1410",
          2: "#3A2F26",
          mute: "#7A6E64",
        },
        line: {
          DEFAULT: "rgba(26,20,16,.10)",
          soft: "rgba(26,20,16,.06)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "brand-grad":
          "linear-gradient(135deg,#F8C84A 0%,#F5A623 35%,#F07B20 70%,#E8621A 100%)",
        "brand-grad-soft":
          "linear-gradient(135deg,rgba(248,200,74,.08),rgba(232,98,26,.08))",
      },
      borderRadius: {
        sm2: "10px",
        DEFAULT: "18px",
        lg2: "28px",
      },
      boxShadow: {
        sm2: "0 1px 2px rgba(26,20,16,.04), 0 8px 24px -12px rgba(26,20,16,.08)",
        soft: "0 2px 4px rgba(26,20,16,.04), 0 24px 60px -24px rgba(232,98,26,.18)",
      },
      keyframes: {
        rise: {
          from: { transform: "translateY(105%)" },
          to: { transform: "translateY(0)" },
        },
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
        rise: "rise .9s cubic-bezier(.2,.8,.2,1) both",
        scroll: "scroll 38s linear infinite",
        pulse2: "pulse2 2s ease infinite",
      },
    },
  },
  plugins: [],
};
