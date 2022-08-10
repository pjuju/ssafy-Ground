import { apiInstance } from "api";

const api = apiInstance();

function getUserInfo(success) {
  api.get("/user/state").then(success);
}

function initUserDetail(userDetail, success) {
  api.post("/user/userDetail", userDetail).then(success);
}

export { getUserInfo, initUserDetail };
