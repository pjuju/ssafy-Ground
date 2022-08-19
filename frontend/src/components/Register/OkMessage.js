import { Grid } from "@mui/material";

function OkMessage(props) {
  return (
    <Grid className="register-form__ok" container>
      {props.children}
    </Grid>
  );
}

export default OkMessage;
