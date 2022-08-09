import { apiInstance } from "api";

const api = apiInstance();

function login(info, success, fail) {
  api.post(`/rest/user/login`, info).then(success).catch(fail);
}

export { login };
