import { Grid } from "@mui/material";

function ErrorMessage(props) {
  return (
    <Grid className="register-form__error" item>
      * {props.children}
    </Grid>
  );
}

export default ErrorMessage;
