import { createTheme } from "@mui/material/styles";

const font = "'Chilanka', sans-serif";

const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      light: "fff",
      main: "#0C546A",
      dark: "#r2B393E",
      contrastText: "#F0E29B",
    },
    background: {
      paper: "#a5adb5",
      default: "#b79fad"
    },
  },


  typography: {
    fontFamily: font,
    fontSize: 16,
    fontWeight: "bold"
   
  },
});
export default theme;
