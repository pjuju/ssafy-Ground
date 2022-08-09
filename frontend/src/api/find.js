import { apiInstance } from "api";

const api = apiInstance();

function emailAuth(email, success) {
  api.get(`user/emailAuth?email=${email}`).then(success);
};

function findId(email, success) {
  api.get(`user/findId/${email}`).then(success);
};

function modifyPass(info, success) {
  api.post(`user/modifyPass`, info).then(success);
};

function confirmPass(info, success) {
  api.put(`user/modifyPass`, info).then(success);
};

function usedEmail(email, success) {
  api.get(`user/isUsedEmail?email=${email}`).then(success);
}


export { emailAuth, findId, modifyPass, confirmPass, usedEmail }