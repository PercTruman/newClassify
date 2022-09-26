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
    light: "9FCEE2",
    main: "556f7a",
    dark: "r2B393E",
    contrastText: "DD6C4D",
  },
  typography: {
    fontFamily: font,
    fontSize: 16,
  },
});
export default theme;
