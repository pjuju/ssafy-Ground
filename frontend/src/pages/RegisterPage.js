import "styles/Register/RegisterPage.scss";
import logo from "assets/images/text_logo.png";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

// 아이디 정규식
const idRegExp = /^[a-zA-Z0-9|]{5,20}$/;
// 비밀번호 정규식
const pwRegExp = /^[a-zA-Z0-9d`~!@#$%^&*()-_=+]{8,20}$/;
// 이메일 정규식
const emailRegExp =
  /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*.[a-zA-Z]{2,3}$/;
// 정규식 테스트
function RegExpTest(regExp, newValue, setValue) {
  setValue(newValue);
  const result = regExp.test(newValue);
  if (result) {
    console.log(result);
  }
}

function RegisterPage() {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  // 비밀번호 확인 비교
  function comparePW(pwCheckValue) {
    if (pwValue === pwCheckValue) {
      console.log(true);
    }
  }

  return (
    <Container className="register-form" maxWidth="xs">
      <Grid
        className="register-form__wrapper"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="register-form__logo" item>
          <img className="logo" src={logo} alt="text_logo" width="300rem" />
        </Grid>
        <Grid container justifyContent="center">
          <TextField
            className="register-form__field"
            size="small"
            label="아이디"
            value={idValue}
            onChange={(e) => {
              RegExpTest(idRegExp, e.target.value, setIdValue);
            }}
          />
          <Button variant="contained">중복 확인</Button>
        </Grid>
        <TextField
          size="small"
          label="비밀번호"
          type="password"
          value={pwValue}
          onChange={(e) => {
            RegExpTest(pwRegExp, e.target.value, setPwValue);
          }}
        />
        <TextField
          size="small"
          type="password"
          label="비밀번호 확인"
          onChange={(e) => {
            comparePW(e.target.value);
          }}
        />
        <Grid container justifyContent="center">
          <TextField
            className="register-form__field"
            size="small"
            label="이메일"
            value={emailValue}
            onChange={(e) => {
              RegExpTest(emailRegExp, e.target.value, setEmailValue);
            }}
          />
          <Button variant="contained">중복 확인</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
