module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        skin: {
          dark: "var(--color-text-dark)",
          light: "var(--color-text-light)",
        }
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-background)",
          filldark: "var(--color-background-dark)",
          button: "var(--color-button)",
          buttonhover: "var(--color-button-hover)",
        }
      },
      borderColor: {
        skin: {
          dark: "var(--color-text-dark)",
          light: "var(--color-text-light)", 
        }
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
