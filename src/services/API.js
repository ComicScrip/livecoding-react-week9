import axios, { CancelToken } from 'axios';
import queryString from 'query-string';

import * as Promise from 'bluebird';

Promise.config({
  cancellation: true,
});

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const makeCancellable = (method, url, data, config) => {
  return new Promise((resolve, reject, onCancel) => {
    const source = CancelToken.source();
    instance({
      method,
      url,
      data,
      cancelToken: source.token,
      ...config,
    })
      .then(resolve)
      .catch((thrown) => {
        if (!axios.isCancel(thrown)) throw new Error(thrown);
      })
      .catch(reject);

    onCancel(() => {
      window.console.log('Request cancelled');
      source.cancel('Request was cancelled');
    });
  });
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
