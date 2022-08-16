import { apiInstance } from "api";

const api = apiInstance();

function getFollowBoard(pageNumber, success) {
  api.get(`/board/follow/${pageNumber}`).then(success);
}

function getLatestBoard(pageNumber, success) {
  api.get(`/board/interest/${pageNumber}`).then(success);
}

function getWrittenBoard(userId, pageNumber, success) {
  api.get(`/board/list/me/${userId}/${pageNumber}`).then(success);
}

function getSavedBoard(userId, pageNumber, success) {
  api.get(`/board/list/save/${userId}/${pageNumber}`).then(success);
}

function getBoardDetail(id, success, fail) {
  api.get(`/board/${id}`).then(success).catch(fail);
}

function likeBoard(boardId, success) {
  api.post(`/board/${boardId}/like`).then(success);
}

function unlikeBoard(boardId, success) {
  api.delete(`/board/${boardId}/like`).then(success);
}

function saveBoard(boardId, success) {
  api.post(`/board/${boardId}/save`).then(success);
}

function unsaveBoard(boardId, success) {
  api.delete(`/board/${boardId}/save`).then(success);
}

export {
  getSavedBoard,
  getFollowBoard,
  getLatestBoard,
  getBoardDetail,
  getWrittenBoard,
  likeBoard,
  unlikeBoard,
  saveBoard,
  unsaveBoard,
};
