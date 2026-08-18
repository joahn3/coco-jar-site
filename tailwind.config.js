/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--ds-surface-page)",
          base: "var(--bg-surface)",
          subtle: "var(--ds-surface-subtle)",
          card: "var(--ds-surface-card)",
          raised: "var(--ds-surface-raised)",
          overlay: "var(--ds-surface-overlay)",
          panel: "var(--bg-surface-card)",
        },
        ink: {
          DEFAULT: "var(--ds-text-primary)",
          title: "var(--ds-text-primary)",
          muted: "var(--ds-text-muted)",
          secondary: "var(--ds-text-secondary)",
          on: {
            primary: "var(--ds-text-on-primary)",
          },
        },
        text: {
          DEFAULT: "var(--ds-text-primary)",
          secondary: "var(--ds-text-secondary)",
          muted: "var(--ds-text-muted)",
          on: {
            primary: "var(--ds-text-on-primary)",
          },
        },
        border: "var(--ds-border)",
        brand: {
          DEFAULT: "var(--ds-accent)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          400: "var(--color-brand-400)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
        display: ["var(--font-serif)", "Inter", "Arial", "sans-serif"],
        body: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
      },
      borderRadius: {
        "ds-sm": "var(--ds-radius-sm)",
        "ds-md": "var(--ds-radius-md)",
        "ds-lg": "var(--ds-radius-lg)",
        "ds-xl": "var(--ds-radius-xl)",
        "ds-2xl": "var(--ds-radius-2xl)",
      },
      spacing: {
        touch: "var(--ds-tap-min)",
        "section-x": "var(--space-section-x)",
        "section-y": "var(--space-section-y)",
      },
      boxShadow: {
        focus: "var(--ds-focus-ring)",
      },
      ringWidth: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};
