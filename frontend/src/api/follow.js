import { apiInstance } from "api";

const api = apiInstance();

function acceptFollow(toUserId, fromUserId, success) {
  api.post(`/rest/follow/Accept/${toUserId}/${fromUserId}`).then(success);
}

export { acceptFollow };
