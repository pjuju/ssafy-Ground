import { apiInstance } from "api";

const api = apiInstance();

function login(info, success, fail) {
  api.get(`/user/login`, info).then(success).catch(fail);
}

export { login };
