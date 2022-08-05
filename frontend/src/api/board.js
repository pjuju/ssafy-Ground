import { apiInstance } from "api";

const api = apiInstance();

function getSavedBoard(userId, success) {
  api.get(`/rest/board/save/${userId}`).then(success);
}

function getFollowBoard(pageNumber, success) {
  api.get(`/rest/board/follow?${pageNumber}`).then(success);
}

export { getSavedBoard, getFollowBoard };
