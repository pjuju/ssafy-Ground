import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import GrButton from "components/common/GrButton";
import GrTextField from "components/common/GrTextField";

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

function BasicInfo({ changeBasicInfo, goToOtherInfo }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");

  // 비밀번호 확인 비교
  const comparePW = (pwCheckValue) => {
    if (pw === pwCheckValue) {
      console.log(true);
    }
  };

  // 다음 버튼 핸들러
  const onClickNext = () => {
    // state 변경
    const newBasicInfo = {
      id: id,
      pass: pw,
      email: email,
    };
    changeBasicInfo(newBasicInfo);
    // 컴포넌트전환
    goToOtherInfo();
  };

  return (
    <Grid className="register-form__top" item>
      <Grid
        className="register-form__inner-wrapper"
        container
        justifyContent="space-between"
      >
        <GrTextField
          className="register-form__field"
          size="small"
          label="아이디"
          value={id}
          onChange={(e) => {
            RegExpTest(idRegExp, e.target.value, setId);
          }}
        />
        <GrButton className="register-form__innerBtn" variant="contained">
          중복확인
        </GrButton>
      </Grid>
      <Grid className="register-form__inner-wrapper" item>
        <GrTextField
          className="register-form__password"
          size="small"
          label="비밀번호"
          type="password"
          value={pw}
          onChange={(e) => {
            RegExpTest(pwRegExp, e.target.value, setPw);
          }}
        />
        <GrTextField
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
        <GrTextField
          className="register-form__field"
          size="small"
          label="이메일"
          value={email}
          onChange={(e) => {
            RegExpTest(emailRegExp, e.target.value, setEmail);
          }}
        />
        {!isAuthenticated && (
          <GrButton className="register-form__innerBtn" variant="contained">
            중복확인
          </GrButton>
        )}
        {isAuthenticated && !isSubmitted && (
          <GrButton className="register-form__innerBtn" variant="contained">
            전송
          </GrButton>
        )}
        {isSubmitted && (
          <GrButton className="register-form__innerBtn" variant="contained">
            재전송
          </GrButton>
        )}
      </Grid>
      {!isSubmitted && (
        <Grid
          className="register-form__inner-wrapper"
          container
          justifyContent="space-between"
        >
          <GrTextField
            className="register-form__field"
            size="small"
            label="인증번호"
          />
          <GrButton className="register-form__innerBtn" variant="contained">
            인증
          </GrButton>
        </Grid>
      )}
      <GrButton
        className="register-form__button"
        variant="contained"
        onClick={onClickNext}
      >
        다음
      </GrButton>
    </Grid>
  );
}

export default BasicInfo;
