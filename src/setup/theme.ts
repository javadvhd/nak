import { Theme } from "@emotion/react";

export const theme: Theme = {
  colors: {
    primary: "#5A67D8",
    secondary: "#3182CE",
    background: "#F7FAFC",
    textPrimary: "#2D3748",
    textSecondary: "#718096",
    error: "#E53E3E",
    white: "#FFFFFF",
  },
  typography: {
    family: "Inter, sans-serif",
    sizes: {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
  },
};

// Type augmentation for Emotion's Theme type
declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      textPrimary: string;
      textSecondary: string;
      error: string;
      white: string;
    };
    typography: {
      family: string;
      sizes: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
