import { useMutation, useQueryCache } from 'react-query';
import isArray from 'lodash/isArray';
import { makeEntityDeleter } from '../services/API';

export default function useCollectionRemover(
  collectionName,
  options = {},
  customMutationConfig = {}
) {
  const {
    updateLocalDataBefore = false,
    updateLocalDataAfter = true,
    invalidateQueryAfter = false,
    updateDataOnError = false,
    rollbackOnError = true,
    getEntityId = (entity) => entity.id,
  } = options;

  const queryCache = useQueryCache();

  const updateLocalData = (id) => {
    const previousCollection = queryCache.getQueryData(collectionName);
    if (isArray(previousCollection)) {
      queryCache.setQueryData(collectionName, (old) =>
        old.filter((entity) => getEntityId(entity) !== id)
      );
    }
    // return the rollback function that will be given as the third param of onError callback
    return () => queryCache.setQueryData(collectionName, previousCollection);
  };

  return useMutation(makeEntityDeleter(collectionName), {
    onMutate: (id) => {
      if (updateLocalDataBefore) {
        queryCache.cancelQueries(collectionName);
        return updateLocalData(id);
      }
      return () => {};
    },
    onError: (err, variables, rollback) => {
      if (updateLocalDataBefore && rollbackOnError) {
        rollback();
      }
    },
    onSettled: (data, err, variables) => {
      if (updateLocalDataAfter && (updateDataOnError || !err)) {
        updateLocalData(variables);
      }

      if (invalidateQueryAfter) {
        queryCache.invalidateQueries(collectionName);
      }
    },
    ...customMutationConfig,
  });
}
