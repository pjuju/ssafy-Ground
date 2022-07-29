import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "styles/Register/RegisterPage.scss";

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

function BasicInfo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    <Grid className="register-form__top" item>
      <Grid
        className="register-form__inner-wrapper"
        container
        justifyContent="space-between"
      >
        <TextField
          className="register-form__field"
          size="small"
          label="아이디"
          value={idValue}
          onChange={(e) => {
            RegExpTest(idRegExp, e.target.value, setIdValue);
          }}
        />
        <Button className="register-form__innerBtn" variant="contained">
          중복확인
        </Button>
      </Grid>
      <Grid className="register-form__inner-wrapper" item>
        <TextField
          className="register-form__password"
          size="small"
          label="비밀번호"
          type="password"
          value={pwValue}
          onChange={(e) => {
            RegExpTest(pwRegExp, e.target.value, setPwValue);
          }}
        />
        <TextField
          className="register-form__password"
          size="small"
          label="비밀번호 확인"
          type="password"
          onChange={(e) => {
            comparePW(e.target.value);
          }}
        />
      </Grid>
      <Grid
        className="register-form__inner-wrapper"
        container
        justifyContent="space-between"
      >
        <TextField
          className="register-form__field"
          size="small"
          label="이메일"
          value={emailValue}
          onChange={(e) => {
            RegExpTest(emailRegExp, e.target.value, setEmailValue);
          }}
        />
        {!isAuthenticated && (
          <Button className="register-form__innerBtn" variant="contained">
            중복확인
          </Button>
        )}
        {isAuthenticated && !isSubmitted && (
          <Button className="register-form__innerBtn" variant="contained">
            전송
          </Button>
        )}
        {isSubmitted && (
          <Button className="register-form__innerBtn" variant="contained">
            재전송
          </Button>
        )}
      </Grid>
      {!isSubmitted && (
        <Grid
          className="register-form__inner-wrapper"
          container
          justifyContent="space-between"
        >
          <TextField
            className="register-form__field"
            size="small"
            label="인증번호"
          />
          <Button className="register-form__innerBtn" variant="contained">
            인증
          </Button>
        </Grid>
      )}
      {/* <Grid container justifyContent="center">
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
        label="비밀번호 확인"
        type="password"
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
      </Grid> */}
    </Grid>
  );
}

export default BasicInfo;
