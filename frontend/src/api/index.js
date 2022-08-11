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
    config.headers.ftoken = token;
    return config;
  });
  return instance;
}

export { apiInstance };
