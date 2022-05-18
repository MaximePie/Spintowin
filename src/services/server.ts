import axios from 'axios';

console.log(import.meta.env.VITE_BASE_URL);
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
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
