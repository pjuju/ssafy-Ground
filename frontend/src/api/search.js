import { apiInstance } from "api";

const api = apiInstance();

function searchBoard(data, pageNumber, success, fail) {
  api.post(`/search/board/${pageNumber}`, data).then(success).catch(fail);
}

function searchUser(word, success, fail) {
  api.post(`/search/user`, word).then(success).catch(fail);
}

function getSearchBoard(success, fail) {
  api.get(`/search/board`).then(success).catch(fail);
}

function getSearchUser(success, fail) {
  api.get(`/search/user`).then(success).catch(fail);
}

function deleteSearchUser(id, success, fail) {
  api.delete(`/search/user/${id}`).then(success).catch(fail);
}

function deleteAllSearchUser(success, fail) {
  api.delete(`/search/user`).then(success).catch(fail);
}

function deleteSearchBoard(id, success, fail) {
  api.delete(`/search/board/${id}`).then(success).catch(fail);
}

function deleteAllSearchBoard(success, fail) {
  api.delete(`/search/board`).then(success).catch(fail);
}

export {
  searchBoard,
  searchUser,
  getSearchBoard,
  getSearchUser,
  deleteSearchUser,
  deleteAllSearchUser,
  deleteSearchBoard,
  deleteAllSearchBoard,
};
