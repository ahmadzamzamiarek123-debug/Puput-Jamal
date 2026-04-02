import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFCF0",
          100: "#FAF8E8",
          200: "#F5F2D8",
        },
        sage: {
          50: "#F0F4F0",
          100: "#E3EBE3",
          200: "#D6E4D3",
          300: "#B8D4B4",
          400: "#8BBD85",
          500: "#5FA356",
          600: "#4A8242",
          700: "#3B6634",
          800: "#2F4F4F",
          900: "#1F3A3A",
        },
        dino: {
          yellow: "#F4D03F",
          "yellow-light": "#F7DC6F",
          "yellow-dark": "#D4AC0D",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "floral-pattern": "url('/flower-border.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
