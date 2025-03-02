/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ["var(--font-dm-sans)"],
        circularStd: ["var(--circularStd)", "sans-serif"],
        circularItalic: ["var(--circularItalic)", "sans-serif"],
        circularBold: ["var(--circularBold)", "sans-serif"],
      },
      fontSize: {
        base: "0.984375rem",
      },
      fontWeight: {
        book: "400",
        mediumItalic: "500",
        bold: "600",
      },
      colors: {
        lime: "rgba(var(--lime))",
        gray: "rgba(var(--gray))",
      },
    },
  },
  plugins: [],
};
