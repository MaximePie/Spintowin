import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_BASE_URL,
});

export function setAuthToken(authToken: string | null) {
  axiosInstance.defaults.headers = {
    'auth-token': authToken,
  };
}

export function getFromServer(path: string, signal: any = null) {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  signal?.addEventListener('abort', () => {
    console.log('Aborted ');
    source.cancel('Query was cancelled by React Query');
  });

  return axiosInstance.get(path, {
    headers: axiosInstance.defaults.headers,
    cancelToken: source.token,
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
