import axios from 'axios';
import queryString from 'query-string';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// const makeCancellable = (axiosPromise) => {};

export const getCollection = (collectionName, queryParams) => {
  return instance
    .get(
      `/${collectionName}${
        queryParams ? `?${queryString.stringify(queryParams)}` : ''
      }`
    )
    .then((res) => res.data);
};

export const getEntity = (collectionName, id) =>
  instance.get(`/${collectionName}/${id}`).then((res) => res.data);
export const makeEntityDeleter = (collectionName) => (id) =>
  instance.delete(`/${collectionName}/${id}`).then((res) => res.data);

export default instance;
