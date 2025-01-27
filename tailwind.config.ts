import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 5px 2px rgba(100, 175, 255, 0.8)',  
        neon: '0 0 10px 4px rgba(100, 175, 255, 1)', 
      },
      colors: {
        purple: "#914e75",
        purple1: "#fccfec",
        purple2: "#ea91f1",
        purple3: "#ce78f3",
        darkPurple: "#392A48",
        blue: "#3B82F6",
        pink: "#ce9cff"
      },
    },
    fontFamily: {
      orbitron: ["Orbitron", "sans-serif"],
      rubik:["Rubik Vinyl", "serif"],
      roboto:["Roboto Mono", "serif"]
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;
