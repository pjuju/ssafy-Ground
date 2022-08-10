import { apiInstance } from "api";

const api = apiInstance();

function login(info, success, fail) {
  api.post(`/user/login`, info).then(success).catch(fail);
}

export { login };
