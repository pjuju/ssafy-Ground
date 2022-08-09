import { apiInstance } from "api";

const api = apiInstance();

/* 계정 알림 조회 */
function getAccountNoti(userToken, success) {
  api
    .get(`/notification/account}`, { params: { ftoken: userToken } })
    .then(success);
}

/* 계정 알림 생성 */
function createAccountNoti(toUserId, fromUserId, success) {
  api.post(`/notification/account/${toUserId}/${fromUserId}`).then(success);
}

/* 계정 알림 전체 확인 */
function readAllAccountNoti(userId, success) {
  api.post(`/notification/account/check/${userId}`).then(success);
}

/* 계정 알림 1개 확인 */
function readOneAccountNoti(notiId, success) {
  api.post(`/notification/account/check/noti/${notiId}`).then(success);
}

/* 계정 알림 삭제 */
function deleteAccountNoti(notiId, success) {
  api.post(`/notification/account/delete/${notiId}`).then(success);
}

/* 게시글 알림 조회 */
function getBoardNoti(userToken, success) {
  api
    .get(`/notification/board`, { params: { ftoken: userToken } })
    .then(success);
}

/* 게시글 알림 생성 */
function createBoardNoti(boardId, fromUserId, success) {
  api.post(`/notification/board/${boardId}/${fromUserId}`).then(success);
}

/* 게시글 알림 전체 확인 */
function readAllBoardNoti(userId, success) {
  api.post(`/notification/board/check/${userId}`).then(success);
}

/* 게시글 알림 1개 확인 */
function readOneBoardNoti(notiId, success) {
  api.post(`/notification/board/check/noti/${notiId}`).then(success);
}

/* 게시글 알림 삭제 */
function deleteBoardNoti(notiId, success) {
  api.post(`/notification/board/delete/${notiId}`).then(success);
}

export {
  getAccountNoti,
  createAccountNoti,
  readAllAccountNoti,
  readOneAccountNoti,
  deleteAccountNoti,
  getBoardNoti,
  createBoardNoti,
  readAllBoardNoti,
  readOneBoardNoti,
  deleteBoardNoti,
};
