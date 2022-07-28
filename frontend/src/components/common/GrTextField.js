import theme from "./theme";
import { TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

function GrTextField(props) {
  return (
    <ThemeProvider theme={theme}>
      <TextField {...props}/>
    </ThemeProvider>
  );
}

export default GrTextField;
