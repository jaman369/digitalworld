import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0076ff",      // Vibrant Blue
          hover: "#005ecf",
          light: "#ebf5ff",
        },
        secondary: {
          DEFAULT: "#10b981",    // Green badge/status
          hover: "#059669",
          light: "#ecfdf5",
        },
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        bg: {
          white: "#ffffff",
          light: "#f8fafc",
          alt: "#f1f5f9",
          dark: "#151619",        // Dark Footer background
          cardDark: "#0d1527",    // Dark Card background
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "30px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.05)",
        md: "0 4px 20px -2px rgba(0,0,0,0.05), 0 2px 8px -1px rgba(0,0,0,0.03)",
        lg: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)",
        premium: "0 30px 60px -15px rgba(0,0,0,0.08)",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
        tight: "-0.01em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
