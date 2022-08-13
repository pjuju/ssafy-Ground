import { kakaoLogin } from "api/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KakaoRedirectHandler() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    (async () => {
      try {
        console.log(code);
        await kakaoLogin(code, (res) => {
          localStorage.setItem("token", res.data.ftoken);
          if (res.data.registerYN) {
            navigate("/feed/follow");
          } else {
            navigate("/register");
          }
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [code]);
}

export default KakaoRedirectHandler;
