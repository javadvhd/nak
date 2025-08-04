import { Theme } from "@emotion/react";

export const theme: Theme = {
  colors: {
    black: "#000000",
    primary: "#5A67D8",
    secondary: "#3182CE",
    background: "#FFFFFF66",
    inputBackground: "#00000005",
    backgroundGradiant: "linear-gradient(167.98deg, #F4F4F4 0%, #F6F6F6 100%)",
    textPrimary: "#2D3748",
    textSecondary: "#718096",
    error: "#E53E3E",
    white: "#FFFFFF",
    placeholder: "#00000033",
  },
  typography: {
    sizes: {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
    },

    family: "Inter, sans-serif",
    variants: {
      biggestSize: {
        fontSize: "1.875rem",
        fontWeight: 800,
        lineHeight: 1,
      },
      mediumSize: {
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: "40px",
      },
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.75,
        textTransform: "uppercase",
      },
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.25rem", // 20px
    xl: "1.5rem", // 24px
    xxl: "2rem", // 32px
    xxxl: "2.5rem", // 40px
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
      black: string;
      primary: string;
      secondary: string;
      background: string;
      backgroundGradiant: string;
      inputBackground: string;
      textPrimary: string;
      textSecondary: string;
      error: string;
      white: string;
      placeholder: string;
    };
    typography: {
      family: string;
      variants: {
        biggestSize: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        mediumSize: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        h1: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        h2: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        h3: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        h4: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        h5: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        h6: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        body1: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        body2: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        subtitle1: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        subtitle2: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        caption: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
        };
        button: {
          fontSize: string;
          fontWeight: number;
          lineHeight: number;
          textTransform: string;
        };
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
