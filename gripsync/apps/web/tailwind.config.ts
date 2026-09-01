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
        primary: "#3B82F6",
        accent: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        background: {
          dark: "#0F172A",
          DEFAULT: "#0F172A"
        },
        surface: "#1E293B",
        text: "#F8FAFC"
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(16, 185, 129, 0.6)' }
        }
      }
    },
  },
  plugins: [],
};
export default config;
