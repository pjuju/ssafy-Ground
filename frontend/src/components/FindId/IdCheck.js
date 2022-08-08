import { useEffect, useState } from "react";
import { Grid, Modal }  from "@mui/material";
import { emailAuth, findId, usedEmail } from "api/find";
import GrButton from 'components/common/GrButton';
import GrTextField from 'components/common/GrTextField';
import { Box } from "@mui/system";
import find from "modules/find";

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

function IdCheck({idFlag, onSetIdFlag, userId, onSetUserId}) {
	const [email, setEmail] = useState("");
	const [userValNumber, setUserValNumber] = useState("");
  const [valNumber, setValNumber] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

	const onEmailHandler = (event) => {
		setEmail(event.target.value)
	};
	const onUserValNumberHandler = (event) => {
		setUserValNumber(parseInt(event.target.value))
	};
  const onClickIdCheck = () => {
    console.log(userValNumber)
    console.log(valNumber)
    if ((valNumber === userValNumber) && (userValNumber !== "")){
      setAuthOpen(true);
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
      setEmailOpen(true);
      setIsCheck(!res.data);
    });
  };

  const onClickCheck = () => {
    setEmailOpen(false);
    if (isCheck === true) {
      emailAuth(email, (res) => {
        setValNumber(res.data);
        console.log(res.data);
      })
    }
  }

  useEffect(() => {
    console.log(onSetIdFlag);
  })
 
	return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <GrTextField
            className="findid-form__field"
            id="email"
            label="이메일"
            size="small"
            value={email}
            onChange={onEmailHandler}
          />
        </Grid>
        <Grid item>
          <GrButton
            className="findid-form__button"
            variant="contained"
            onClick={onClickEmail}
          >
            인증번호 전송
          </GrButton>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <GrTextField
            className="findid-form__field"
            id="verification-number"
            label="인증번호"
            size="small"
            value={userValNumber}
            onChange={onUserValNumberHandler}
          />
        </Grid>
        <Grid item>
          <GrButton
            className="findid-form__button"
            variant="contained"
            onClick={onClickIdCheck}
          >
            인증
          </GrButton>
        </Grid>
      </Grid>
      <Modal open={authOpen}>
        <Box sx={boxStyle}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <div> 인증되었습니다. </div>
            </Grid>
            <Grid item>
              <GrButton onClick={onClickAuth}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={emailOpen}>
        <Box sx={boxStyle}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              {isCheck === true && (
                <div> 인증메일이 발송되었습니다.</div>
              )}
              {isCheck === false && (
                <div> 존재하지 않는 이메일입니다. </div>
              )}
            </Grid>
            <Grid item>
              <GrButton onClick={onClickCheck}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default IdCheck;