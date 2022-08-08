import { useState } from "react";
import { Grid, Modal }  from "@mui/material";
import GrTextField from 'components/common/GrTextField';
import GrButton from 'components/common/GrButton';
import { Box } from "@mui/system";
import { confirmPass } from "api/find";

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

function PasswordResult({userId, userEmail}) {
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [checkOpen, setCheckOpen] = useState(false);
	const [isCheck, setIsCheck] = useState(false);
	const onPasswordHandler = (event) => {
		setPassword(event.target.value)
	}
	const onPasswordCheckHandler = (event) => {
		setPasswordCheck(event.target.value)
	}
  const onClickPasswordConfirm = () => {
		const info = {
			email: userEmail,
			password: password,
			username: userId,
		}
    if (passwordCheck === password) {
			setIsCheck(true);
			confirmPass(info, (res) => {
				console.log(res.data);
			})
		}
		setCheckOpen(true);
  }
	const onClickCheck = () => {
		setCheckOpen(false);
	}
	return (
		<div style={{width:512}}>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
          <GrTextField
              className="findid-form__field"
              id="new-password"
              label="변경할 비밀번호"
              type="password"
              size="small"
              value={password}
              onChange={onPasswordHandler}
          />
				</Grid>
			</Grid>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
            <GrTextField
                className="findid-form__field"
                id="new-password-check"
                label="비밀번호 확인"
                type="password"
                size="small"
                value={passwordCheck}
                onChange={onPasswordCheckHandler}
              /> 
				</Grid>
			</Grid>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
          <GrButton
            className="findid-form__button"
            variant="contained"
            onClick={onClickPasswordConfirm}
          >
            비밀번호 재설정
					</GrButton>
				</Grid>
			</Grid>
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
                <div> 비밀번호가 변경되었습니다. </div>
              )}
              {isCheck === false && (
                <div> 비밀번호가 일치하지 않습니다. </div>
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
}

export default PasswordResult;