import { apiInstance } from "api";

const api = apiInstance();

function search(type, data, success, fail) {
  api.get(`/${type}`, data).then(success).catch(fail);
}

function getSearchBoard(success, fail) {
  api.get(`/search/board`).then(success).catch(fail);
}

function getSearchUser(success, fail) {
  api.get(`/search/user`).then(success).catch(fail);
}

export { search, getSearchBoard, getSearchUser };
