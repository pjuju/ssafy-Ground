import { apiInstance } from "api";

const api = apiInstance();

function acceptFollow(toUserId, fromUserId, success) {
  api.post(`/follow/accept/${toUserId}/${fromUserId}`).then(success);
}

export { acceptFollow };
