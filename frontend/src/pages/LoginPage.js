import { Grid } from '@mui/material';
import GoogleButton from 'components/Login/OAuth/GoogleButton';
import KakaoButton from 'components/Login/OAuth/KakaoButton.js';
import 'styles/Login/LoginPage.scss';

function LoginPage() {
	return (
		<Grid container className='social-login'>
			<Grid item className='social-login__button'>
				<KakaoButton />
				<GoogleButton />
			</Grid>
		</Grid>
	)
}

export default LoginPage;