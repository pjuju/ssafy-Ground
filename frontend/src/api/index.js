import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-type": "application/json",
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
