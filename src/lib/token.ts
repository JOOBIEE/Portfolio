export const tokens = {
  colors: {
    light: {
      background: "#F7F7F2",
      surface: "#EFEFEA",
      border: "#E0E0D8",
      borderSubtle: "#EBEBЕ4",
      textPrimary: "#0A0A0A",
      textSecondary: "#4A4A45",
      textMuted: "#8A8A82",
      accent: "#1A1A1A",
    },
    dark: {
      background: "#070A0F",
      surface: "#0D1117",
      border: "#1E2530",
      borderSubtle: "#161C24",
      textPrimary: "#DCE6FF",
      textSecondary: "#8A9BB8",
      textMuted: "#4A5568",
      accent: "#4D7EFF",
    },
  },

  modes: {
    systems: {
      light: { accent: "#0A0A0A", tag: "#E8E8E2" },
      dark: { accent: "#4D7EFF", tag: "#0D1117" },
    },
    narratives: {
      light: { accent: "#1A1A1A", tag: "#F0EDE6" },
      dark: { accent: "#C8B8FF", tag: "#0D1117" },
    },
    perception: {
      light: { accent: "#1A1A1A", tag: "#EAF0FF" },
      dark: { accent: "#7FAAFF", tag: "#0D1117" },
    },
  },

  fonts: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "40px",
    "2xl": "64px",
    "3xl": "96px",
  },

  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },

  transitions: {
    fast: "150ms ease",
    base: "250ms ease",
    slow: "400ms ease",
    mode: "600ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};