import axios from 'axios';
import { useEffect } from 'react';

function GoogleRedirectHandler() {
    const accessToken = new URLSearchParams(window.location.hash.substring(1)).get("access_token");
    
    useEffect(() => {
        console.log(accessToken);
        // 백엔드 서버로 액세스 토큰을 보낸다.
        // axios.post(`oauth/callback/google`, { accessToken })
        // .then((res) => {
        //     console.log(res);
            
        //     // 백엔드 서버에서 받은 액세스 토큰을 로컬 저장소에 저장한다.
        //     const ACCESS_TOKEN = res.data.accessToken;
        //     localStorage.setItem('token', ACCESS_TOKEN);
        //     window.location.href('/');
        // })
        // .catch((err) => {
        //     console.error(err);
        //     alert('로그인에 실패했습니다.');
        //     window.location.href('/');
        // })
    })
}

export default GoogleRedirectHandler;