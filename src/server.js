import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export function setAuthToken(authToken) {
  axiosInstance.headers = {
    "auth-token": authToken
  }
}

export function getFromServer(path) {
  return axiosInstance.get(path, {
    headers: axiosInstance.headers,
  });
}

export function postOnServer(path, body) {
  return axiosInstance.post(
    path,
    body,
    {
      headers: axiosInstance.headers,
    }
  );
}
