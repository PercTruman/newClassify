import { createTheme } from "@mui/material/styles";

const font = "'Chilanka', sans-serif";

const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
  },
  background: {
    paper: "#fff",
    default: "#fafafa",
  },
  primary: {
    light: "rgba(89, 210, 188, 1)",
    main: "rgba(20, 160, 140, 1)",
    dark: "rgba(0, 113, 95, 1)",
    contrastText: "#fff",
  },
  typography: {
    fontFamily: font,
    fontSize: 16,
  },
});
export default theme;
