import { useMutation, useQueryCache } from 'react-query';

export default function useMutationFlow(
  queryKey,
  mutationFn,
  options = {},
  customMutationConfig = {},
  updateLocalData
) {
  const {
    updateLocalDataBefore = false,
    updateLocalDataAfter = true,
    invalidateQueryAfter = false,
    updateDataOnError = false,
    rollbackOnError = true,
  } = options;

  const queryCache = useQueryCache();

  return useMutation(mutationFn, {
    onMutate: (variables) => {
      if (updateLocalDataBefore) {
        queryCache.removeQueries(queryKey);
        return updateLocalData(queryCache, variables, null, null);
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
        updateLocalData(queryCache, variables, data, err);
      }

      if (invalidateQueryAfter) {
        queryCache.invalidateQueries(queryKey);
      }
    },
    ...customMutationConfig,
  });
}
