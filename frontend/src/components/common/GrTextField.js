import theme from "./theme";
import { TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";

// function GrTextField(props) {
//   return (
//     <ThemeProvider theme={theme}>
//       <TextField {...props}/>
//     </ThemeProvider>
//   );
// }
const GrTextField = React.forwardRef((props, ref) => (
  <ThemeProvider theme={theme}>
    <TextField ref={ref} {...props} />
  </ThemeProvider>
));

export default GrTextField;
