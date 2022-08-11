import { apiInstance } from "api";

const api = apiInstance();

function feedCreate(data, success) {
  api.post(`/board`, data).then(success);
}

export { feedCreate }