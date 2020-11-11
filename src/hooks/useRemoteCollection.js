import { useQuery } from 'react-query';
import { getCollection } from '../services/API';

export default function useRemoteCollection(query, queryOptions = {}) {
  return useQuery(query, getCollection, queryOptions);
}
