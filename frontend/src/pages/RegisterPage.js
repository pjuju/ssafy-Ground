import logo from "assets/images/text_logo.png";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import BasicInfo from "components/Register/BasicInfo";
import OtherInfo from "components/Register/OtherInfo";

import "styles/Register/RegisterPage.scss";

<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> front
import { signUp } from "api/register";

function RegisterPage() {
  const [next, setNext] = useState(false);
  const [basicInfo, setBasicInfo] = useState({});
  const [otherInfo, setOtherInfo] = useState({});

  // 다음 버튼 핸들러
  const goToOtherInfo = () => {
    if (!next) {
      setNext(!next);
    }
  };
  // state 변경 함수
  const changeBasicInfo = (newBasicInfo) => {
<<<<<<< HEAD
    console.log(newBasicInfo);
    setBasicInfo(newBasicInfo);
  };
  const changeOtherInfo = (newOtherInfo) => {
    console.log(newOtherInfo);
=======
    setBasicInfo(newBasicInfo);
  };
  const changeOtherInfo = (newOtherInfo) => {
>>>>>>> front
    setOtherInfo(newOtherInfo);
  };
  // 회원가입 요청
  const sendRequest = () => {
    const info = Object.assign({}, basicInfo, otherInfo);
<<<<<<< HEAD
    console.log(info);
    signUp(info);
  };

  useEffect(() => {
    // 새로고침, 창닫기 alert
    const preventClose = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

=======
    signUp(info);
  };

>>>>>>> front
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
        {!next && (
          <BasicInfo
            changeBasicInfo={changeBasicInfo}
            goToOtherInfo={goToOtherInfo}
          />
        )}
        {next && (
          <OtherInfo
            changeOtherInfo={changeOtherInfo}
            sendRequest={sendRequest}
          />
        )}
      </Grid>
    </Container>
  );
}

export default RegisterPage;
