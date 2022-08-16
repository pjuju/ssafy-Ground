import { googleLogin } from "api/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleRedirectHandler() {
  const navigate = useNavigate();
  const accessToken = new URLSearchParams(
    window.location.hash.substring(1)
  ).get("access_token");

  useEffect(() => {
    (async () => {
      try {
        console.log(accessToken);
        await googleLogin(accessToken, (res) => {
          localStorage.setItem("token", res.data.ftoken);
          const result = res.data.result;
          if (result === "success signup") {
            navigate("/register");
          } else {
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
