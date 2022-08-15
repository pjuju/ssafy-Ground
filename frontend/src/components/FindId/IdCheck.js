import { useEffect, useState } from "react";
import { Grid, Modal }  from "@mui/material";
import { emailAuth, findId, usedEmail } from "api/find";
import GrButton from 'components/common/GrButton';
import GrTextField from 'components/common/GrTextField';
import { Box } from "@mui/system";
import find from "modules/find";


function IdCheck({idFlag, onSetIdFlag, userId, onSetUserId}) {
	const [email, setEmail] = useState("");
	const [userValNumber, setUserValNumber] = useState("");
  const [valNumber, setValNumber] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmailError, setisEmailError] = useState(false);

	const onEmailHandler = (event) => {
		setEmail(event.target.value)
	};
	const onUserValNumberHandler = (event) => {
    if (event.target.value !== "") {
      setUserValNumber(parseInt(event.target.value));
    }
    if (event.target.value === "") {
      setUserValNumber("");
    }
	};

  const onClickIdCheck = () => {
    console.log(userValNumber)
    console.log(valNumber)
    if ((valNumber === userValNumber) && (userValNumber !== "")){
      setAuthOpen(true);
      setIsError(false);
    }

    if ((valNumber !== userValNumber)) {
      setIsError(true);
    }
  };
  const onClickAuth = () =>{
    setAuthOpen(false);
    findId(email, (res) => {
      onSetUserId(res.data);
      console.log(userId);
    })
    onSetIdFlag(1);
  }
  const onClickEmail = () => {
    usedEmail(email, (res) => {
      if (res.data === false) {
        setEmailOpen(true);
        setisEmailError(false);
      }
      if (res.data === true) {
        setisEmailError(true);
      }
    });
  };

  const onClickCheck = () => {
    setEmailOpen(false);
      emailAuth(email, (res) => {
        setValNumber(res.data);
        console.log(res.data);
      })
  }

  useEffect(() => {
    console.log(onSetIdFlag);
  })
 
	return (
    <div>
      <Grid container alignItems="center" className="id-check__inner-wrapper">
        <Grid container justifyContent="space-between">
          <GrTextField
            id="email"
            label="이메일"
            size="small"
            className="id-check__field"
            value={email}
            error={isEmailError}
            helperText={isEmailError ? "존재하지 않는 이메일입니다." : ""}
            onChange={onEmailHandler}
          />
          <GrButton
            className="id-check__button"
            variant="contained"
            onClick={onClickEmail}
          >
            인증번호 전송
          </GrButton>
        </Grid>
      </Grid>
      <Grid container alignItems="center" className="id-check__inner-wrapper">
        <Grid container justifyContent="space-between">
          <GrTextField
            className="id-check__field"
            id="verification-number"
            label="인증번호"
            size="small"
            error={isError}
            helperText={isError ? "인증번호가 일치하지 않습니다." : ""}
            value={userValNumber}
            onChange={onUserValNumberHandler}
          />
          <GrButton
            className="id-check__button"
            variant="contained"
            onClick={onClickIdCheck}
          >
            인증
          </GrButton>
        </Grid>
      </Grid>
      <Modal open={authOpen}>
        <Box className="id-check__box">
          <Grid
            container
            className="id-check__modal-wrapper"
            alignItems="flex-end"
          >
            <Grid container justifyContent="center">
              <div> 인증되었습니다. </div>
            </Grid>
            <Grid container justifyContent="center" className="id-check__modal">
              <GrButton onClick={onClickAuth}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={emailOpen}>
        <Box className="id-check__box">
          <Grid
            container
            className="id-check__modal-wrapper"
            alignItems="flex-end"
          >
            <Grid container justifyContent="center">
              <div> 인증메일이 발송되었습니다.</div>
            </Grid>
            <Grid container justifyContent="center" className="id-check__modal">
              <GrButton onClick={onClickCheck}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default IdCheck;