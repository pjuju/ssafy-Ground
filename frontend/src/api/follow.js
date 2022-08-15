import { apiInstance } from "api";

const api = apiInstance();

function requestFollow(toUserId, success) {
  api.post(`/follow/${toUserId}`).then(success);
}

function requestUnfollow(toUserId, success) {
  api.delete(`/follow/${toUserId}`).then(success);
}

function acceptFollow(notiId, success) {
  api.post(`/follow/accept/${notiId}`).then(success);
}

function declineFollow(notiId, success) {
  api.delete(`/follow/decline/${notiId}`).then(success);
}

function getFollowerList(profileId, userId, success) {
  api.get(`/follow/${profileId}/follower/${userId}`).then(success);
}

function getFollowingList(profileId, userId, success) {
  api.get(`/follow/${profileId}/following/${userId}`).then(success);
}

function deleteFollower(fromUserId, success) {
  api.delete(`/follow/follower/${fromUserId}`).then(success);
}

export {
  requestFollow,
  requestUnfollow,
  acceptFollow,
  declineFollow,
  getFollowerList,
  getFollowingList,
  deleteFollower,
};
