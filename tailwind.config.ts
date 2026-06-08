import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0f0f1a",
          card: "#1a1a2e",
          card2: "#16213e",
        },
        border: "#2a2a4a",
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
          light: "#e0e7ff",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
