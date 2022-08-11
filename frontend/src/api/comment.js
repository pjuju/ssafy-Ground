import { apiInstance } from "api";

const api = apiInstance();

function registerComment(boardId, comment, success, fail) {
  api.post(`/board/${boardId}/comment`, comment).then(success).catch(fail);
}

function updateComment(commentId, success, fail) {
  api.put(`/comment/${commentId}`).then(success).catch(fail);
}

function deleteComment(commentId, success, fail) {
  api.delete(`/comment/${commentId}`).then(success).catch(fail);
}

export { registerComment, updateComment, deleteComment };
