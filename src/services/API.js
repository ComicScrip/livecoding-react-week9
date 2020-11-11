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
    source.cancel('Request was cancelled');
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

export const makeEntityAdder = (collectionName) => (attributes) =>
  makeCancellable('post', `/${collectionName}`, attributes).then(
    (res) => res.data
  );

export const getEntity = (collectionName, id) => {
  makeCancellable(
    instance.get(`/${collectionName}/${id}`).then((res) => res.data)
  );
};
export const makeEntityDeleter = (collectionName) => (id) =>
  makeCancellable('delete', `/${collectionName}/${id}`).then((res) => res.data);

export const makeEntityUpdater = (collectionName) => (id, attributes) =>
  makeCancellable('patch', `/${collectionName}/${id}`, attributes).then(
    (res) => res.data
  );

export default instance;
