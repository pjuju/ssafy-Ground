import { apiInstance } from "api";

const api = apiInstance();

function login(info, success, fail) {
  api.post(`/user/login`, info).then(success).catch(fail);
}

function kakaoLogin(code, success, fail) {
  api.post(`/user/oauth/kakao?code=${code}`).then(success).catch(fail);
}

export { login, kakaoLogin };
