import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const DEFAULT_TIMEOUT = 10000;
const MAX_RETRY_COUNT = 3;
const INITIAL_RETRY_DELAY = 500;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// Attach the persisted auth token to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (error) => {
  if (!error.response) {
    return true;
  }

  const { status } = error.response;
  return status === 429 || (status >= 500 && status < 600);
};

const request = async ({ url, method = 'get', data, params, headers, retries = MAX_RETRY_COUNT }) => {
  let attempt = 0;

  while (true) {
    try {
      const response = await api({
        url,
        method,
        data,
        params,
        headers,
      });

      return response.data;
    } catch (error) {
      attempt += 1;

      if (attempt <= retries && shouldRetry(error)) {
        const delay = INITIAL_RETRY_DELAY * 2 ** (attempt - 1);
        await sleep(delay);
        continue;
      }

      if (error.response) {
        const { status, data: responseData } = error.response;
        const message = responseData?.message || responseData || error.message;
        const apiError = new Error(typeof message === 'string' ? message : 'Request failed');
        apiError.status = status;
        throw apiError;
      }

      throw error;
    }
  }
};

const get = (url, params, options = {}) => request({ url, method: 'get', params, ...options });
const post = (url, data, options = {}) => request({ url, method: 'post', data, ...options });
const put = (url, data, options = {}) => request({ url, method: 'put', data, ...options });
const del = (url, data, options = {}) => request({ url, method: 'delete', data, ...options });

export { api, setAuthToken, request, get, post, put, del };
