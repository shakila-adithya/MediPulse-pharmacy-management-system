/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef4ff",
          100: "#dae8ff",
          200: "#bcd4ff",
          300: "#8db8ff",
          400: "#5691ff",
          500: "#2f68f5",
          600: "#1d4ded",
          700: "#1a3ddb",
          800: "#1c34b1",
          900: "#152a7d",
          950: "#0f1c52",
        },
        teal: {
          50: "#effcfa",
          100: "#c9f6ee",
          200: "#94ecdd",
          300: "#5cdac9",
          400: "#2fc0b1",
          500: "#17a395",
          600: "#118279",
          700: "#116863",
          800: "#125350",
          900: "#124542",
          950: "#052826",
        },
        slate: {
          25: "#fbfcfd",
          850: "#172033",
          950: "#0b1120",
        },
        success: {
          50: "#ecfdf3",
          100: "#d1fadf",
          500: "#12b76a",
          600: "#039855",
          700: "#027a48",
        },
        warning: {
          50: "#fffaeb",
          100: "#fef0c7",
          500: "#f79009",
          600: "#dc6803",
          700: "#b54708",
        },
        danger: {
          50: "#fef3f2",
          100: "#fee4e2",
          500: "#f04438",
          600: "#d92d20",
          700: "#b42318",
        },
        info: {
          50: "#eff8ff",
          100: "#d1e9ff",
          500: "#2e90fa",
          600: "#1570ef",
          700: "#175cd3",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16, 24, 40, 0.06), 0 1px 3px 0 rgba(16, 24, 40, 0.10)",
        "card-hover": "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
        pop: "0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
        "slide-in-right": "slideInRight 0.25s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: { "0%": { opacity: 0, transform: "translateY(8px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        slideInRight: { "0%": { opacity: 0, transform: "translateX(16px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
      },
    },
  },
  plugins: [],
};
