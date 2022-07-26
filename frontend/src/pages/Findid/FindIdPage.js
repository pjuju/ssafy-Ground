import React from "react";
import "styles/FindId/FindIdPage.scss";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { Grid }  from "@mui/material";
import { Container } from "@mui/material";
import { Button } from "@mui/material";
import { Tabs, Tab, Box } from "@mui/material";
import logo from "assets/images/text_logo.png";

function IdTab() {
	const [isAuth, setIsAuth] = React.useState(false);
	
	const handleIsAuth = (bool) => {
		setIsAuth(bool)
	};


	return (
		<div
		>
			{isAuth === false && (
				<IdCheck handleIsAuth={handleIsAuth}/>
			)}
			{isAuth === true && (
				<IdResult handleIsAuth={handleIsAuth}/>
			)}
		</div>
		)
}

function IdCheck({handleIsAuth}) {
	const [email, setEmail] = React.useState("");
	const [valNumber, setValNumber] = React.useState("");
	const onEmailHandler = (event) => {
		setEmail(event.target.value)
	}
	const onValNumberHandler = (event) => {
		setValNumber(event.target.value)
	};

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
}
function IdResult() {
	return (
			<div>
				<Grid item>
					<div>
						등록된 아이디는 userid입니다.
					</div>
				</Grid>
				<Grid item>
					<Button
						className="findid-form__button"
						variant="contained"
					>
						로그인 하러 가기
					</Button>
				</Grid>
			</div>
	)
}

function PasswordTab(){
	const [isAuth, setIsAuth] = React.useState(false);
	
	const handleIsAuth = (bool) => {
		setIsAuth(bool)
	};


	return (
		<div
		>
			{isAuth === false && (
				<PasswordCheck handleIsAuth={handleIsAuth}/>
			)}
			{isAuth === true && (
				<PasswordResult handleIsAuth={handleIsAuth}/>
			)}
		</div>
		)
}

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
}

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
function TabPanel(props) {
	const {value, index, ...other } = props;
	 
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === 0 && (
				<IdTab/>
			)}
			{value === 1 && (
				<PasswordTab/>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}


function FindIdPage() {
	const [value, setValue] = React.useState(0);
	

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

	return (
		<Container className="findid-form" maxwidth="xs" fixed>
			<Grid
				container
				className="findid-form__wrapper"
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<Grid className="login-form__logo" item>
          <img className="logo" src={logo} alt="text_logo" width="300px" />
        </Grid>
				<Grid item>
					<Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
							<Tab label="아이디 찾기" {...a11yProps(0)} />
							<Tab label="비밀번호 찾기" {...a11yProps(1)} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}/>
					<TabPanel value={value} index={1}/>
				</Grid>
			</Grid>
		</Container>
	);
}

export default FindIdPage;