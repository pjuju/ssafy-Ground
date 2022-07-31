import "styles/Login/LoginPage.scss";
import logo from "assets/images/text_logo.png";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import GoogleButton from "components/Login/OAuth/GoogleButton";
import KakaoButton from "components/Login/OAuth/KakaoButton.js";
import GrButton from "components/common/GrButton";

import { useState } from "react";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [userPW, setUserPW] = useState("");
  const [idProps, setIdProps] = useState({
    className: "login-form__field",
    label: "아이디",
    variant: "outlined",
    size: "small",
    error: false,
    helperText: "",
  });
  const [pwProps, setPwProps] = useState({
    className: "login-form__field",
    label: "비밀번호",
    variant: "outlined",
    size: "small",
  });

  function submitLogin() {
    let isLoginOk = true;
    let newIdProps = { ...idProps };
    let newPwProps = { ...pwProps };

    if (userId.trim() === "") {
      isLoginOk = false;
      newIdProps.error = true;
      newIdProps.helperText = "아이디를 입력해주세요";
    } else {
      newIdProps.error = false;
      newIdProps.helperText = "";
    }

    if (userPW.trim() === "") {
      isLoginOk = false;
      newPwProps.error = true;
      newPwProps.helperText = "비밀번호를 입력해주세요";
    } else {
      newPwProps.error = false;
      newPwProps.helperText = "";
    }

    setIdProps(newIdProps);
    setPwProps(newPwProps);

    if (isLoginOk) {
      // 로그인 요청
    }
  }

  return (
    <Container className="login-form" maxWidth="xs" fixed>
      <Grid
        className="login-form__wrapper"
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid className="login-form__logo" item>
          <img className="logo" src={logo} alt="text_logo" width="300px" />
        </Grid>
        {/* <TextField
          className="login-form__field"
          label="아이디"
          variant="outlined"
          size="small"
          value={userId}
          helperText="아이디를 입력해주세요"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        /> */}
        <TextField
          {...idProps}
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        {/* <TextField
          className="login-form__field"
          label="비밀번호"
          variant="outlined"
          size="small"
          value={userPW}
          helperText="비밀번호를 입력해주세요"
          onChange={(e) => {
            setUserPW(e.target.value);
          }}
        /> */}
        <TextField
          {...pwProps}
          value={userPW}
          onChange={(e) => {
            setUserPW(e.target.value);
          }}
        />
        <GrButton
          className="login-form__button"
          variant="contained"
          onClick={submitLogin}
        >
        </GrButton>
        <Grid container className="social-login">
          <Grid item className="social-login__button">
            <KakaoButton />
            <GoogleButton />
          </Grid>
        </Grid>
        <Grid
          className="login-form__bottom"
          container
          justifyContent="space-between"
        >
          <Grid item>
            <a href="/register">회원가입</a>
          </Grid>
          <Grid item>
            <a href="/">아이디 찾기 / 비밀번호 찾기</a>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
