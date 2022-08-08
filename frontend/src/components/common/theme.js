import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#54BAB9",
      contrastText: "#fff",
    },
    secondary: {
      main: "#18978F",
    },
    warning: {
      main: "#E6330F",
    },
    notification: {
      main: "#d32f2f",
      contrastText: "#fff",
    },
    like: {
      main: "#F6547E",
    },
  },
});

export default theme;
