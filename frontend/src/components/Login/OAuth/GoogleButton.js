import { GOOGLE_AUTH_URL } from 'components/Login/OAuth/GoogleAuth.js';
import GoogleSigninLightNormal from 'assets/images/oauth/btn_google_signin_light_normal_web@2x.png'

function GoogleButton() {
	return (
		<div className='google-login'>
			<a href={GOOGLE_AUTH_URL}>
				<img
					className='google-login__button'
					src={GoogleSigninLightNormal} />
			</a>
		</div>
	)
}

export default GoogleButton;