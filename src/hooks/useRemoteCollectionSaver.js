import isArray from 'lodash/isArray';
import { makeEntityDeleter } from '../services/API';
import useMutationFlow from './useMuationFlow';

export default function useCollectionSaver(
  queryKey,
  options = {},
  customMutationConfig = {}
) {
  const { getEntityId = (entity) => entity.id } = options;

  const updateLocalData = (cache, mutateActionPayload) => {
    const previousCollection = cache.getQueryData(queryKey);
    if (isArray(previousCollection)) {
      cache.setQueryData(queryKey, (old) =>
        old.filter((entity) => getEntityId(entity) !== mutateActionPayload)
      );
    }
    // return the rollback function that will be given as the third param of onError callback
    return () => cache.setQueryData(queryKey, previousCollection);
  };

  return useMutationFlow(
    queryKey,
    makeEntityDeleter(queryKey),
    options,
    customMutationConfig,
    updateLocalData
  );
}
