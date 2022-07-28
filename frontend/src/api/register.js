import { apiInstance } from "api";

const api = apiInstance();

function signUp(info) {
  api.post(`/posts`, info).then((response) => console.log(response.data));
}

export { signUp };
