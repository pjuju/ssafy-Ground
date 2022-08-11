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

function logout(success) {
  api.delete("/user/logout").then(success);
}

export { getUserState, initUserDetail, getUserProfile, modifyUserInfo, logout };
