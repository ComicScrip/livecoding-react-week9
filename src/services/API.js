import axios, { CancelToken } from 'axios';
import queryString from 'query-string';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const makeCancellable = (method, url, data, config) => {
  const source = CancelToken.source();
  const promise = instance({
    method,
    url,
    data,
    cancelToken: source.token,
    ...config,
  });
  promise.cancel = () => {
    window.console.log('Request cancelled');
    source.cancel('Query was cancelled by React Query');
  };
  return promise;
};

export const getCollection = (collectionName, queryParams) => {
  return makeCancellable(
    'get',
    `/${collectionName}${
      queryParams ? `?${queryString.stringify(queryParams)}` : ''
    }`
  ).then((res) => res.data);
};

export const getEntity = (collectionName, id) => {
  return instance.get(`/${collectionName}/${id}`).then((res) => res.data);
};
export const makeEntityDeleter = (collectionName) => (id) =>
  instance.delete(`/${collectionName}/${id}`).then((res) => res.data);

export default instance;
