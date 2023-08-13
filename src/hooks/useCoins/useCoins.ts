import { initQueryClient } from '@ts-rest/react-query';
import { ZodError } from 'zod';

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
  errorDetails?: string,
  triggerRefetch: () => void,
};

export default function useCoins(
  url: string,
  port: string,
): UseCoinsIsFetching | UseCoinsSuccess | UseCoinsError {
  const client = initQueryClient(contract, {
    // baseUrl: `${url}${port}`,
    baseUrl: `${url}:${port}`,
    baseHeaders: {},
  });

  const {
    data,
    isFetching,
    error,
    refetch,
    isError,
    // isLoadingError,
  } = client.getCoins.useQuery(
    ['coins'],
    {},
    {
      staleTime: Number.POSITIVE_INFINITY,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  );

  if (isFetching) {
    return {
      type: 'fetching',
    } satisfies UseCoinsIsFetching;
  }

  if (isError || !data?.body?.length) {
    return {
      type: 'error',
      // defined in server/app.ts
      errorDetails: (error?.status === 404) // discriminated union
        ? error.body.message
        : undefined,
      triggerRefetch: () => refetch(),
    } satisfies UseCoinsError;
  }

  return {
    type: 'success',
    data: data.body,
  } satisfies UseCoinsSuccess;
}
