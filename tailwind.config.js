/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0a0a0f",
        "bg-secondary": "#0d0d14",
        "accent-blue": "#38bdf8",
        "accent-blue-mid": "#60a5fa",
        "accent-purple": "#818cf8",
        "accent-purple-light": "#a78bfa",
        "text-primary": "#ffffff",
        "text-secondary": "#94a3b8",
        "card-bg": "#111118",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-btn": "linear-gradient(to right, #60a5fa, #818cf8)",
        "gradient-text": "linear-gradient(to right, #60a5fa, #818cf8)",
        "gradient-border":
          "linear-gradient(135deg, rgba(96,165,250,0.4), rgba(129,140,248,0.4))",
      },
      boxShadow: {
        "blue-glow": "0 0 30px rgba(56,189,248,0.3)",
        "blue-glow-sm": "0 0 15px rgba(56,189,248,0.2)",
        "purple-glow": "0 0 30px rgba(129,140,248,0.3)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
        "spin-slow": "spin 3s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(56,189,248,0.2)" },
          "50%": { boxShadow: "0 0 35px rgba(56,189,248,0.5)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
