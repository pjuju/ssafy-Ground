import { apiInstance } from "api";

const api = apiInstance();

function getSavedBoard(userId, success) {
  api.get(`/board/save/${userId}`).then(success);
}

function getFollowBoard(pageNumber, success) {
  api.get(`/board/follow/${pageNumber}`).then(success);
}

function getLatestBoard(pageNumber, success) {
  api.get(`/board/interest/${pageNumber}`).then(success);
}

function getBoardDetail(id, success, fail) {
  api.get(`/board/${id}`).then(success).catch(fail);
}

export { getSavedBoard, getFollowBoard, getLatestBoard, getBoardDetail };
