import { createTheme } from "@mui/material/styles";

const font = "'Chilanka', sans-serif";

const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      light: "#9FCEE2",
      main: "#0C546A",
      dark: "#r2B393E",
      contrastText: "#DFAC9E",
    },
    background: {
      paper: "#798086",
      default: "#b79fad"
    },
  },


  typography: {
    fontFamily: font,
    fontSize: 16
   
  },
});
export default theme;
