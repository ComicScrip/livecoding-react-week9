import uniqid from 'uniqid';
import { makeEntityAdder } from '../services/API';
import useMutationFlow from './useMuationFlow';

export default function useCollectionAdder(
  queryKey,
  options = {},
  customMutationConfig = {}
) {
  const { idAttributeName = 'id' } = options;
  const optimisticId = uniqid();

  const updateLocalData = (cache, mutateActionPayload, dataFromServer) => {
    const previousCollection = cache.getQueryData(queryKey);
    if (dataFromServer) {
      cache.setQueryData(queryKey, (old) => [
        ...(old || []).filter((e) => e[idAttributeName] !== optimisticId),
        { ...dataFromServer },
      ]);
    } else {
      cache.setQueryData(queryKey, (old) => [
        ...(old || []),
        { ...mutateActionPayload, [idAttributeName]: optimisticId },
      ]);
    }
    // return the rollback function that will be given as the third param of onError callback
    return () => cache.setQueryData(queryKey, previousCollection);
  };

  return useMutationFlow(
    queryKey,
    makeEntityAdder(queryKey),
    options,
    customMutationConfig,
    updateLocalData
  );
}
