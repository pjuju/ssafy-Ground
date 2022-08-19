import { kakaoLogin } from "api/login";
import { useAuth } from "auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KakaoRedirectHandler() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const { systemLogin } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        // console.log(code);
        await kakaoLogin(code, (res) => {
          console.log(code);
          const result = res.data.result;
          const ftoken = res.data.ftoken;
          // 회원가입인 경우
          if (result === "success signup") {
            localStorage.setItem("ftoken", ftoken);
            navigate("/register");
          }
          // 로그인인 경우
          else {
            systemLogin(ftoken);
            localStorage.setItem("token", ftoken);
            if (res.data.registerYN) {
              navigate("/feed/follow");
            } else {
              navigate("/welcome");
            }
          }
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [code]);
}

export default KakaoRedirectHandler;
