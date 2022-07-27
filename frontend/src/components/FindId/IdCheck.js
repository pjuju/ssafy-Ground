import React from "react";
import { TextField } from "@mui/material";
import { Grid }  from "@mui/material";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "components/common/theme.js";

function IdCheck({handleIsAuth}) {
	const [email, setEmail] = React.useState("");
	const [valNumber, setValNumber] = React.useState("");
	const onEmailHandler = (event) => {
		setEmail(event.target.value)
	}
	const onValNumberHandler = (event) => {
		setValNumber(event.target.value)
	};
  const onClickIdCheck = () => {
    console.log(valNumber)
    handleIsAuth(true)
  };
  const onClickEmail = () => {
    console.log(email)
  }
 
	return (
		<div>
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
				justifyContent="center"
				alignItems="center"
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
              onClick={onClickIdCheck}
            >
              인증
            </Button>
          </ThemeProvider>
				</Grid>
			</Grid>
		</div>
	)
};

export default IdCheck;