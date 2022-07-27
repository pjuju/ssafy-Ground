import "styles/Register/RegisterPage.scss";

import Container from "@mui/material/Container";

import BasicInfo from "components/Register/BasicInfo";

function RegisterPage() {
  return (
    <Container className="register-form" maxWidth="xs">
      <BasicInfo />
    </Container>
  );
}

export default RegisterPage;
