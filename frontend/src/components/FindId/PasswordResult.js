import React from "react";
import { TextField } from "@mui/material";
import { Grid }  from "@mui/material";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

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
          <ThemeProvider theme={theme}>
            <TextField
                className="findid-form__field"
                id="new-password"
                label="변경할 비밀번호"
                type="password"
                size="small"
                value={password}
                onChange={onPasswordHandler}

              />
          </ThemeProvider>
				</Grid>
			</Grid>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
          <ThemeProvider theme={theme}>
            <TextField
                className="findid-form__field"
                id="new-password-check"
                label="비밀번호 확인"
                type="password"
                size="small"
                value={passwordCheck}
                onChange={onPasswordCheckHandler}
              />
          </ThemeProvider> 
				</Grid>
			</Grid>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
          <ThemeProvider theme={theme}>
            <Button
              className="findid-form__button"
              variant="contained"
              onClick={onClickPasswordConfirm}
            >
              비밀번호 재설정
					  </Button>
          </ThemeProvider>
				</Grid>
			</Grid>
		</div>
	)
}

export default PasswordResult;