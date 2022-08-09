import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-type": "application/json",
      ftoken: localStorage.getItem("token"),
    },
  });
  return instance;
}

export { apiInstance };
