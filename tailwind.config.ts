import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        leaf: "#256f4a",
        mist: "#eef5f1",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 33, 27, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
