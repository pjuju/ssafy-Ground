import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
      "Content-tupe": "application/json",
    },
  });
  return instance;
}

export { apiInstance };
