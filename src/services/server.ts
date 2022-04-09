import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export function setAuthToken(authToken: string) {
  axiosInstance.defaults.headers = {
    'auth-token': authToken,
  };
}

export function getFromServer(path: string) {
  return axiosInstance.get(path, {
    headers: axiosInstance.defaults.headers,
  });
}

export function postOnServer(path: string, body: any) {
  return axiosInstance.post(
    path,
    body,
    {
      headers: axiosInstance.defaults.headers,
    },
  );
}
