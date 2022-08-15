import { apiInstance } from "api";

const api = apiInstance();

function getFollowBoard(pageNumber, success) {
  api.get(`/board/follow/${pageNumber}`).then(success);
}

function getLatestBoard(pageNumber, success) {
  api.get(`/board/interest/${pageNumber}`).then(success);
}

function getWrittenBoard(userId, pageNumber, success) {
  api.get(`/board/list/me/${userId}?pageNumber=${pageNumber}`).then(success);
}

function getSavedBoard(userId, pageNumber, success) {
  api.get(`/board/list/save/${userId}?pageNumber=${pageNumber}`).then(success);
}

function getBoardDetail(id, success, fail) {
  api.get(`/board/${id}`).then(success).catch(fail);
}

export {
  getSavedBoard,
  getFollowBoard,
  getLatestBoard,
  getBoardDetail,
  getWrittenBoard,
};
