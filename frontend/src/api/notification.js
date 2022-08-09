import { apiInstance } from "api";

const api = apiInstance();

/* 계정 알림 조회 */
function getAccountNoti(success) {
  api.get(`/rest/notification/account`).then(success);
}

/* 계정 알림 생성 */
function createAccountNoti(toUserId, fromUserId, success) {
  api
    .post(`/rest/notification/account/${toUserId}/${fromUserId}`)
    .then(success);
}

/* 계정 알림 전체 확인 */
function readAllAccountNoti(success) {
  api.post(`/rest/notification/account/check`).then(success);
}

/* 계정 알림 삭제 */
function deleteAccountNoti(notiId, success) {
  api.post(`/rest/notification/account/delete/${notiId}`).then(success);
}

/* 게시글 알림 조회 */
function getBoardNoti(success) {
  api.get(`/rest/notification/board`).then(success);
}

/* 게시글 알림 생성 */
function createBoardNoti(boardId, fromUserId, success) {
  api.post(`/rest/notification/board/${boardId}/${fromUserId}`).then(success);
}

/* 게시글 알림 전체 확인 */
function readAllBoardNoti(success) {
  api.post(`/rest/notification/board/check`).then(success);
}

/* 게시글 알림 삭제 */
function deleteBoardNoti(notiId, success) {
  api.post(`/rest/notification/board/delete/${notiId}`).then(success);
}

export {
  getAccountNoti,
  createAccountNoti,
  readAllAccountNoti,
  deleteAccountNoti,
  getBoardNoti,
  createBoardNoti,
  readAllBoardNoti,
  deleteBoardNoti,
};
