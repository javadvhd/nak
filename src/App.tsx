import { ThemeProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { theme } from "./setup/theme";
import { globalStyles } from "./setup/globalStyles";
import "./setup/i18n";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
