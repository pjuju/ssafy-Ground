import React from "react";
import { TextField } from "@mui/material";
import { Grid }  from "@mui/material";
import { Button } from "@mui/material";

function PasswordResult() {
	const [password, setPassword] = React.useState("");
	const [passwordCheck, setPasswordCheck] = React.useState("");
	const onPasswordHandler = (event) => {
		setPassword(event.target.value)
	}
	const onPasswordCheckHandler = (event) => {
		setPasswordCheck(event.target.value)
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
					<TextField
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
					<TextField
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
					<Button
						className="findid-form__button"
						variant="contained"
					>
						비밀번호 재설정
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default PasswordResult;