import logo from "assets/images/text_logo.png";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import BasicInfo from "components/Register/BasicInfo";
import OtherInfo from "components/Register/OtherInfo";

import "styles/Register/RegisterPage.scss";
import { useState } from "react";

function RegisterPage() {
  const [next, setNext] = useState(false);

  function goToNextPage() {
    if (!next) {
      setNext(!next);
    }
  }

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
        {!next && <BasicInfo goToNextPage={goToNextPage} />}
        {next && <OtherInfo />}
      </Grid>
    </Container>
  );
}

export default RegisterPage;
