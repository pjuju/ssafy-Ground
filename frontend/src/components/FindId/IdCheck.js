import React from "react";
import { Grid }  from "@mui/material";
import GrButton from 'components/common/GrButton';
import GrTextField from 'components/common/GrTextField';


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
          <GrTextField
            className="findid-form__field"
            id="email"
            label="이메일"
            size="small"
            value={email}
            nChange={onEmailHandler}
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
				justifyContent="center"
				alignItems="center"
			>
				<Grid item>
          <GrTextField
            className="findid-form__field"
            id="verification-number"
            label="인증번호"
            size="small"
            value={valNumber}
            onChange={onValNumberHandler}
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
		</div>
	)
};

export default IdCheck;