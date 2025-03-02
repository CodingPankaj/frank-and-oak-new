/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "0.781rem",
      },
      colors: {
        "bg-primary-color": "rgba(var(--bg-primary-color))",
        "bg-secondary-color": "rgba(var(--bg-secondary-color))",
        "bg-color-3": "rgba(var(--bg-color-3))",
        "bg-light-color": "rgba(var(--bg-light-color))",
        "text-primary-color": "rgba(var(--text-primary-color))",
        "text-secondary-color": "rgba(var(--text-secondary-color))",
        "text-color-3": "rgba(var(--text-color-3))",
        "text-color-4": "rgba(var(--text-color-4))",
        "accent-color": "rgba(var(--accent-color))",
        "border-color": "rgba(var(--border-color))",
        "border-color-2": "rgba(var(--border-color-2))",
        "border-color-3": "rgba(var(--border-color-3))",
      },
    },
  },
  plugins: [],
};
