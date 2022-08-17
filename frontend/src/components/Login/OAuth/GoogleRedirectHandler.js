import { googleLogin } from "api/login";
import { useAuth } from "auth/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleRedirectHandler() {
  const navigate = useNavigate();
  const accessToken = new URLSearchParams(
    window.location.hash.substring(1)
  ).get("access_token");
  const { systemLogin } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        console.log(accessToken);
        await googleLogin(accessToken, (res) => {
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
  }, [accessToken]);
}

export default GoogleRedirectHandler;
