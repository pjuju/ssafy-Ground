import { apiInstance } from "api";

const api = apiInstance();

function feedCreate(data, success, fail) {
  api.post(`/board`, data).then(success).catch(fail);
}

function feedUpdate(boardId, data, success) {
  api.put(`/board/${boardId}`, data).then(success);
}

function feedRead(boardId, success) {
  api.get(`/board/${boardId}`).then(success);
}

function feedDelete(boardId, success) {
  api.delete(`/board/${boardId}`).then(success);
}
export { feedCreate, feedUpdate, feedRead, feedDelete };
