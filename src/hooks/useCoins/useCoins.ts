import { initQueryClient } from '@ts-rest/react-query';
import { contract } from '../../../server/contract';
import type { CoinData } from '../../types/Coin';

type UseCoinsIsFetching = {
  type: 'fetching',
};

type UseCoinsSuccess = {
  type: 'success',
  data: CoinData[],
};

type UseCoinsError = {
  type: 'error',
  errorDetails?: string, // todo
};

export default function useCoins(
  url: string,
  port: string,
): UseCoinsIsFetching | UseCoinsSuccess | UseCoinsError {
  const client = initQueryClient(contract, {
    baseUrl: `${url}:${port}`,
    baseHeaders: {},
  });

  const {
    data,
    isFetching,
    // error,
    // refetch,
    // isSuccess,
    isError,
  } = client.getCoins.useQuery(
    ['coins'],
    {},
    { staleTime: Number.POSITIVE_INFINITY },
  );

  if (isFetching) {
    return {
      type: 'fetching',
    } satisfies UseCoinsIsFetching;
  }

  if (isError || !data?.body?.length) {
    return {
      type: 'error',
      errorDetails: 'Error',
    } satisfies UseCoinsError;
  }

  return {
    type: 'success',
    data: data.body,
  } satisfies UseCoinsSuccess;
}
