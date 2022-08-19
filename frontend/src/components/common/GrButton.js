import theme from "./theme";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

function GrButton(props) {
  const attr = { ...props };
  delete attr.content;
  delete attr.children;

  return (
    <ThemeProvider theme={theme}>
      <Button {...attr}>{props.children}</Button>
    </ThemeProvider>
  );
}

export default GrButton;
