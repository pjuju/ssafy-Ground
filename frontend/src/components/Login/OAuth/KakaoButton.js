import { KAKAO_AUTH_URL } from 'components/Login/OAuth/KakaoAuth';
import KakaoLoginLargeNarrow from 'assets/images/oauth/kakao_login_large_narrow.png';

function KakaoButton() {
	return (
		<div className="kakao-login">
			<a href={KAKAO_AUTH_URL}>
				<img
					className="kakao-login__button"
					src={KakaoLoginLargeNarrow} />
			</a>
		</div>
	)
}

export default KakaoButton;