import "styles/FindId/FindIdPage.scss";
import { TextField } from "@mui/material";
import { Grid }  from "@mui/material";
import { Container } from "@mui/material";
import { RectButton } from "../../components/RectButton";

function FindIdPage() {
	return (
		<Container className="findid-form" maxwidth="xs" fixed>
			<Grid
				container
				className="findid-form__wrapper"
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
				>
					<Grid item>
						<TextField
						className="findid-form__field"
						id="email"
						color="secondary"
						label="이메일"
						size="small"
						/>
					</Grid>
					<Grid item>
						<RectButton
						 text="인증번호 전송"
						 className="findid-form__button"
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
						id="verification-number"
						label="인증번호"
						size="small"
						/>
					</Grid>
					<Grid item>
						<RectButton text="인증"/>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default FindIdPage;