import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://i7d103.p.ssafy.io/rest",
    headers: {
      "Content-type": "application/json",
      ftoken: localStorage.getItem("token"),
    },
  });

  instance.interceptors.request.use(function (config) {
    // 요청을 보내기 전에 토큰 값 갱신
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;
    return config;
  });

  instance.interceptors.response.use(
    function (response) {
      // 2xx 범위에 있는 상태 코드 트리거
      return response;
    },
    function (error) {
      // 2xx 외의 범위에 있는 상태 코드 트리거
      localStorage.removeItem("token");
      window.location.replace("/");
    }
  );

  return instance;
}

export { apiInstance };
