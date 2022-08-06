import { apiInstance } from "api";

const api = apiInstance();

function search(type, data, success, fail) {
  api.get(`/${type}`, data).then(success).catch(fail);
}

export { search };
