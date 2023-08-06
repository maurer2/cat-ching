import React from 'react';
import { initQueryClient } from '@ts-rest/react-query';

import { contract } from '../../../server/contract';
import App from '../App';
import Money from '../../types/Money';
import type { Coin } from '../../types/Coin';

const port = import.meta.env.VITE_SERVER_PORT;
const client = initQueryClient(contract, {
  baseUrl: `http://localhost:${port}`,
  baseHeaders: {},
});

function AppContainer() {
  const { data, isLoading, error } = client.getCoins.useQuery(
    ['coins'],
    {},
    { staleTime: Number.POSITIVE_INFINITY },
  );

  // eslint-disable-next-line unicorn/no-null
  let coinList: ReadonlyArray<Coin> | null = null;
  if (data?.status && data?.body !== null) {
    coinList = data.body.map((coin) => {
      const {
        name,
        image,
        size,
        value,
      } = coin;

      return {
        name,
        image,
        size,
        amount: Money.fromNumber(value, 'GBP'),
      };
    });
  }

  // todo styling
  if (error) {
    return (
      <div role="status">
        Error
      </div>
    );
  }

  // todo styling
  return (isLoading || coinList === null) ? (
    <div role="status">
      Loading
    </div>
  ) : (
    <App coinList={coinList} data-testid="app" />
  );
}

export default AppContainer;
