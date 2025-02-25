import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "geometric-pattern": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250' viewBox='0 0 20 20'%3E%3Cg fill-opacity='0.17'%3E%3Cpolygon fill='%230C4832' points='20 10 10 0 0 0 20 20'/%3E%3Cpolygon fill='%230C4832' points='0 10 0 20 10 20'/%3E%3C/g%3E%3C/svg%3E")`,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        beanlight: {
          50: "#f3f6f3",
          100: "#e2eae1",
          200: "#c5d5c6",
          300: "#9db89f",
          400: "#76987a",
          500: "#527758",
          600: "#3e5d44",
          700: "#314b37",
          800: "#293c2d",
          900: "#223226",
          950: "#121c14",
          1000: "#0D120E",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
