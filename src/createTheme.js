import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: "300",
    fontWeightRegular: "400",
    fontWeightMedium: "500",
    fontWeightBold: "700"
  },
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#1976d2",
      light: "#1976d2"
    },
    secondary: {
      main: "#f44336",
      dark: "#f44336",
      light: "#f44336"
    }
  }
});
