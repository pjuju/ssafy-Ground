import React from "react";
import { TextField } from "@mui/material";
import { Grid }  from "@mui/material";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

function PasswordCheck({handleIsAuth}) {
	const [email, setEmail] = React.useState();
	const [valNumber, setValNumber] = React.useState();
	const [userId, setUserId] = React.useState();
	const onEmailHandler = (event) => {
		setEmail(event.target.value)
	};
	const onValNumberHandler = (event) => {
		setValNumber(event.target.value)
	};
	const onUserIdHandler = (event) => {
		setUserId(event.target.value)
	};
  const onClickEmail = () => {
    console.log(userId)
    console.log(email)
  }
  const onClickPasswordCheck = () => {
    console.log(valNumber)
    handleIsAuth(true)
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
						<ThemeProvider theme={theme}>
              <TextField
                className="findid-form__field"
                id="id"
                label="아이디"
                size="small"
                value={userId}
                onChange={onUserIdHandler}
              />
            </ThemeProvider>
				  </Grid>
        </Grid>
        <Grid
        container
        direction="row"
        >
          <Grid item>
						<ThemeProvider theme={theme}>
              <TextField
              className="findid-form__field"
              id="email"
              label="이메일"
              size="small"
              value={email}
              onChange={onEmailHandler}
              />
            </ThemeProvider>
					</Grid>
          <Grid item>
						<ThemeProvider theme={theme}>
              <Button
              className="findid-form__button"
              variant="contained"
              onClick={onClickEmail}
              >
                인증번호 전송
              </Button>
            </ThemeProvider>
					</Grid>
        </Grid>
        <Grid
          container
          direction="row"
        >
          <Grid item>
						<ThemeProvider theme={theme}>
              <TextField
              className="findid-form__field"
              id="verification-number"
              label="인증번호"
              size="small"
              value={valNumber}
              onChange={onValNumberHandler}
              />
            </ThemeProvider>
					</Grid>
          <Grid item>
            <ThemeProvider theme={theme}>
              <Button
              className="findid-form__button"
              variant="contained"
              onClick={onClickPasswordCheck}
              >
                인증
              </Button>
            </ThemeProvider>
					</Grid>
        </Grid>        
      </Grid>		
		</div>
		)
};

export default PasswordCheck;