import logo from "assets/images/text_logo.png";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import BasicInfo from "components/Register/BasicInfo";
import OtherInfo from "components/Register/OtherInfo";

import "styles/Register/RegisterPage.scss";

function RegisterPage() {
  return (
    <Container maxWidth="xs">
      <Grid
        className="register-form"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="register-form__logo" item>
          <img className="logo" src={logo} alt="text_logo" width="300rem" />
        </Grid>
        <BasicInfo />
        <OtherInfo />
        <Button variant="contained">회원가입</Button>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
