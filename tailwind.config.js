module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fill: (theme) => ({ red: theme("colors.red.primary") }),
    extend: {
      animation: {
        bounce: "bounce 800ms ease-in-out",
      },
    },
    colors: {
      white: "#ffffff",
      blue: { medium: "#005c98", light: "#0095F6" },
      black: { light: "#262626", faded: "#00000059" },
      gray: { base: "#616161", background: "#fafafa", primary: "#dbdbdb" },
      red: { primary: "#ed4956" },
    },
  },
  variants: {
    display: ["group-hover"],
    extend: {},
  },
  plugins: [],
};
