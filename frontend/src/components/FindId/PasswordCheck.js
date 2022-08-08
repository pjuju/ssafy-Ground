import { useState } from "react";
import { Grid, Modal }  from "@mui/material";
import GrTextField from 'components/common/GrTextField';
import GrButton from 'components/common/GrButton';
import { emailAuth, modifyPass } from "api/find";
import { Box } from "@mui/system";

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
function PasswordCheck({userId, userEmail, onSetUserId, onSetUserEmail, onSetPwFlag }) {
  const [userValNumber, setUserValNumber] = useState("");
	const [valNumber, setValNumber] = useState("");
  const [checkOpen, setCheckOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

	const onEmailHandler = (event) => {
		onSetUserEmail(event.target.value)
	};
	const onUserValNumberHandler = (event) => {
		setUserValNumber(parseInt(event.target.value))
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
      setIsCheck(res.data)
    });
    setCheckOpen(true);
  };
  const onClickPasswordCheck = () => {
    console.log(userValNumber)
    console.log(valNumber)
    if ((valNumber === userValNumber) && (userValNumber !== "")){
      setAuthOpen(true);
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          alignItems="flex-start"
        >
          <Grid item>
            <GrTextField
              className="findid-form__field"
              id="id"
              label="아이디"
              size="small"
              value={userId}
              onChange={onUserIdHandler}
            />
				  </Grid>
        </Grid>
        <Grid
        container
        direction="row"
        >
          <Grid item>
            <GrTextField
              className="findid-form__field"
              id="email"
              label="이메일"
              size="small"
              value={userEmail}
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
        <Grid
          container
          direction="row"
        >
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
              onClick={onClickPasswordCheck}
              >
                인증
            </GrButton>
					</Grid>
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
      <Modal open={checkOpen}>
        <Box sx={boxStyle}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              {isCheck === true && (
                <div> 인증 메일이 발송되었습니다. </div>
              )}
              {isCheck === false && (
                <div> 회원정보가 일치하지 않습니다. </div>
              )}
            </Grid>
            <Grid item>
              <GrButton onClick={onClickCheck}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>		
		</div>
		)
};

export default PasswordCheck;