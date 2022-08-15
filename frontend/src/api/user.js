import { apiInstance } from "api";

const api = apiInstance();

function getUserState(success) {
  api.get("/user/state").then(success);
}

function initUserDetail(userDetail, success) {
  api.post("/user/userDetail", userDetail).then(success);
}

function getUserProfile(userId, success) {
  api.get(`/user/profile/${userId}`).then(success);
}

function modifyUserInfo(userDetail, success) {
  api.put("/user/modifyUser", userDetail).then(success);
}

function updateInterest(interest, success) {
  api.put("/user/category", interest).then(success);
}

function getUserModifyInfo(success) {
  api.get("/user/modifyUser").then(success);
}

function modifyProfile(success) {
  api.put("/user/modifyUser").then(success);
}

function modifyPass(detail, success) {
  api.put("/user/modifyPass", detail).then(success);
}

function logout(success) {
  api.delete("/user/logout").then(success);
}

export {
  getUserState,
  initUserDetail,
  getUserProfile,
  modifyUserInfo,
  updateInterest,
  getUserModifyInfo,
  modifyProfile,
  modifyPass,
  logout,
};
