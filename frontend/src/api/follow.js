import { apiInstance } from "api";

const api = apiInstance();

function acceptFollow(notiId, success) {
  api.post(`/follow/accept/${notiId}`).then(success);
}

function declineFollow(notiId, success) {
  api.delete(`/follow/decline/${notiId}`).then(success);
}

export { acceptFollow, declineFollow };
