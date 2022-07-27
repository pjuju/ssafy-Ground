import React from "react";
import { TextField } from "@mui/material";
import { Grid }  from "@mui/material";
import { Button } from "@mui/material";

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

	return (
		<div>
					<Grid item>
						<TextField
							className="findid-form__field"
							id="id"
							label="아이디"
							size="small"
							value={userId}
							onChange={onUserIdHandler}
						/>
					</Grid>
					<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					<Grid item>
						<TextField
						className="findid-form__field"
						id="email"
						label="이메일"
						size="small"
						value={email}
						onChange={onEmailHandler}
						/>
					</Grid>
					<Grid item>
						<Button
						 className="findid-form__button"
						 variant="contained"
						>
							인증번호 전송
						</Button>
					</Grid>
				</Grid>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
				>
					<Grid item>
						<TextField
						className="findid-form__field"
						id="verification-number"
						label="인증번호"
						size="small"
						value={valNumber}
						onChange={onValNumberHandler}
						/>
					</Grid>
					<Grid item>
						<Button
						 className="findid-form__button"
						 variant="contained"
						 onClick={event => handleIsAuth(true)}
						>
							인증
						</Button>
					</Grid>
				</Grid>
			</div>
		)
};

export default PasswordCheck;