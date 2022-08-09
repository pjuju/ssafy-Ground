import { useState } from "react";
import { Grid, Modal }  from "@mui/material";
import GrTextField from 'components/common/GrTextField';
import GrButton from 'components/common/GrButton';
import { emailAuth, modifyPass } from "api/find";
import { Box } from "@mui/system";


function PasswordCheck({userId, userEmail, onSetUserId, onSetUserEmail, onSetPwFlag }) {
  const [userValNumber, setUserValNumber] = useState("");
	const [valNumber, setValNumber] = useState("");
  const [checkOpen, setCheckOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInfoError, setisInfoError] = useState(false);

	const onEmailHandler = (event) => {
		onSetUserEmail(event.target.value)
	};
	const onUserValNumberHandler = (event) => {
    if (event.target.value !== "") {
      setUserValNumber(parseInt(event.target.value));
    }
    if (event.target.value === "") {
      setUserValNumber("");
    }
	};
	const onUserIdHandler = (event) => {
		onSetUserId(event.target.value)
	};
  const onClickEmail = () => {
    const info = {
      email: userEmail,
      username: userId
    };
    console.log(info)
    modifyPass(info, (res) => {
      console.log(res.data)
      if (res.data === true) {
        setIsCheck(res.data);
        setisInfoError(!res.data);
        setCheckOpen(true);
      }
      if (res.data === false) {
        setisInfoError(!res.data);
      }
    });
  };
  const onClickPasswordCheck = () => {
    console.log(userValNumber)
    console.log(valNumber)
    if ((valNumber === userValNumber) && (userValNumber !== "")){
      setAuthOpen(true);
      setIsError(false);
    }
    if ((valNumber !== userValNumber)) {
      setIsError(true);
    }
  }
  const onClickAuth = () => {
    setAuthOpen(false);
    onSetPwFlag(1);
  }
  const onClickCheck = () => {
    setCheckOpen(false);
    if (isCheck === true) {
      emailAuth(userEmail, (res) => {
        setValNumber(res.data);
        console.log(res.data);
      });
    };
  }
	return (
    <div>
      <Grid container className="pw-check__inner-wrapper" alignItems="center">
        <Grid container justifyContent="space-between">
          <GrTextField
            className="pw-check__field"
            id="id"
            label="아이디"
            size="small"
            error={isInfoError}
            helperText={isInfoError ? "회원정보가 일치하지 않습니다." : ""}
            value={userId}
            onChange={onUserIdHandler}
          />
        </Grid>
      </Grid>
      <Grid container className="pw-check__inner-wrapper" alignItems="center">
        <Grid container justifyContent="space-between">
          <GrTextField
            className="pw-check__field"
            id="email"
            label="이메일"
            size="small"
            value={userEmail}
            error={isInfoError}
            helperText={isInfoError ? "회원정보가 일치하지 않습니다." : ""}
            onChange={onEmailHandler}
          />
          <GrButton
            className="pw-check__button"
            variant="contained"
            onClick={onClickEmail}
          >
            인증번호 전송
          </GrButton>
        </Grid>
      </Grid>
      <Grid container className="pw-check__inner-wrapper" alignItems="center">
        <Grid container justifyContent="space-between">
          <GrTextField
            className="pw-check__field"
            id="verification-number"
            label="인증번호"
            size="small"
            error={isError}
            helperText={isError ? "인증번호가 일치하지 않습니다." : ""}
            value={userValNumber}
            onChange={onUserValNumberHandler}
          />
          <GrButton
            className="pw-check__button"
            variant="contained"
            onClick={onClickPasswordCheck}
          >
            인증
          </GrButton>
        </Grid>
      </Grid>
      <Modal open={authOpen}>
        <Box className="pw-check__box">
          <Grid
            container
            className="pw-check__modal-wrapper"
            alignItems="flex-end"
          >
            <Grid container justifyContent="center">
              <div> 인증되었습니다. </div>
            </Grid>
            <Grid container justifyContent="center" className="pw-check__modal">
              <GrButton onClick={onClickAuth}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={checkOpen}>
        <Box className="pw-check__box">
          <Grid
            container
            className="pw-check__modal-wrapper"
            alignItems="flex-end"
          >
            <Grid container justifyContent="center">
              {isCheck === true && <div> 인증 메일이 발송되었습니다. </div>}
              {isCheck === false && <div> 회원정보가 일치하지 않습니다. </div>}
            </Grid>
            <Grid container justifyContent="center" className="pw-check__modal">
              <GrButton onClick={onClickCheck}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default PasswordCheck;