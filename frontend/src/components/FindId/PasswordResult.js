import React from "react";
import { Grid }  from "@mui/material";
import GrTextField from 'components/common/GrTextField';
import GrButton from 'components/common/GrButton';

function PasswordResult() {
	const [password, setPassword] = React.useState("");
	const [passwordCheck, setPasswordCheck] = React.useState("");
	const onPasswordHandler = (event) => {
		setPassword(event.target.value)
	}
	const onPasswordCheckHandler = (event) => {
		setPasswordCheck(event.target.value)
	}
  const onClickPasswordConfirm = () => {
    console.log(password)
    console.log(passwordCheck)
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
		</div>
	)
}

export default PasswordResult;