import { useEffect, useState } from "react";
import { Grid, Modal }  from "@mui/material";
import GrTextField from 'components/common/GrTextField';
import GrButton from 'components/common/GrButton';
import { Box } from "@mui/system";
import { confirmPass, modifyPass } from "api/find";



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
			pass: password,
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
		const info = {
			email: userEmail,
			pass: password,
			username: userId,
		}
		modifyPass(info, (res) => {
			console.log(res.data)
		})
		setCheckOpen(false);
	}
	return (
		<div>
			<Grid
				container
				className="pw-result__inner-wrapper"
				alignItems="center"
			>
				<Grid container justifyContent="center">
          <GrTextField
              className="pw-result__field"
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
				className="pw-result__inner-wrapper"
				alignItems="center"
			>
				<Grid container justifyContent="center">
            <GrTextField
                className="pw-result__field"
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
				className="pw-result__inner-wrapper"
				alignItems="center"
			>
				<Grid container justifyContent="center">
          <GrButton
            className="pw-result__button"
            variant="contained"
            onClick={onClickPasswordConfirm}
          >
            비밀번호 재설정
					</GrButton>
				</Grid>
			</Grid>
			<Modal open={checkOpen}>
        <Box className="pw-result__box">
          <Grid
             container
						 className="pw-result__modal-wrapper"
						 alignItems="flex-end"
          >
            <Grid container justifyContent="center">
              {isCheck === true && (
                <div> 비밀번호가 변경되었습니다. </div>
              )}
              {isCheck === false && (
                <div> 비밀번호가 일치하지 않습니다. </div>
              )}
            </Grid>
            <Grid container justifyContent="center" className="pw-result__modal">
              <GrButton onClick={onClickCheck}>확인</GrButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
		</div>
	)
}

export default PasswordResult;