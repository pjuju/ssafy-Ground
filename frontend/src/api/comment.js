import { apiInstance } from "api";

const api = apiInstance();

function registerComment(boardId, comment, success, fail) {
  api.post(`/board/${boardId}/comment`, success, fail);
}

function updateComment(commentId, success, fail) {
  api.put(`/comment/${commentId}`, success, fail);
}

function deleteComment(commentId, success, fail) {
  api.delete(`/comment/${commentId}, success, fail`);
}

export { registerComment, updateComment, deleteComment };
