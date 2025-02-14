import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@mossoft/ui-kit/**/*.js",
  ],

  theme: {
    colors: {
      primary: "#5246FE",
      "primary-light": "#DCDAFF",
      "primary-dark-light": "#3685FC",
      light: "#F2F7FF",
      "light-gray": "#B7B7B7",
      "dark-gray": "#00000080",
      dark: "#151F2B",
      "dark-light": "#00000099",
      danger: "#FE4845",
      success: "#39CD3F",
      yellow: "#FFCA7C",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" },
      },
      slideOut: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
    animation: {
      slideIn: "slideIn 0.3s ease-out",
      slideOut: "slideOut 0.3s ease-out",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "backgound-header": "url('/images/background-header.svg')",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotation: "rotation 1s linear infinite",
      },
    },
    screens: {
      xs: "480px",
      sm: "600px",
      md: "900px",
      lg: "1023px",
      xl: "1200px",
      "2xl": "1440px",
    },
    container: {
      // TODO: Check container width and maybe set it like that
      screens: {
        xl: "100%",
        // "2xl": "1440px",
      },
    },
  },
  plugins: [
    // @ts-ignore
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    // @ts-ignore
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".bg-main": {
          background: "#FFFFFF",
          // "backdrop-filter": "blur(25px)",
        },
      });
    },
    require("tailwind-scrollbar"),
    require("@tailwindcss/line-clamp"),
  ],
};
export default config;
