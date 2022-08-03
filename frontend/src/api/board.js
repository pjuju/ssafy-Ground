import { apiInstance } from "api";

const api = apiInstance();

function getSavedBoard(userId, success) {
  api.get(`/rest/board/save/${userId}`).then(success);
}

export { getSavedBoard };
