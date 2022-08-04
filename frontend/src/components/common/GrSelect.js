import theme from "./theme";
import { Select } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";

const GrSelect = React.forwardRef((props, ref) => (
  <ThemeProvider theme={theme}>
    <Select ref={ref} {...props}>
      {props.children}
    </Select>
  </ThemeProvider>
));

export default GrSelect;
