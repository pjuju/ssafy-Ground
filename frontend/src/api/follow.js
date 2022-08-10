import { apiInstance } from "api";

const api = apiInstance();

function acceptFollow(fromUserId, success) {
  api.post(`/follow/accept/${fromUserId}`).then(success);
}

function declineFollow(fromUserId, success) {
  api.post(`/follow/accept/${fromUserId}`).then(success);
}

export { acceptFollow, declineFollow };
