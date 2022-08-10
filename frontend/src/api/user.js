import { apiInstance } from "api";

const api = apiInstance();

function getUserInfo(success) {
  api.get('user/state').then(success);
}

export { getUserInfo };
