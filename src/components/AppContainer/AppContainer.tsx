import React, { useEffect } from 'react';
import { initClient } from '@ts-rest/core';
import { contract } from '../../../server/contract';

import App from '../App';
import Money from '../../types/Money';

import coinData from '../../data/coins';
import Coin from '../../types/Coin';

const port = import.meta.env.VITE_SERVER_PORT;

function AppContainer() {
  useEffect(() => {
    const client = initClient(contract, {
      baseUrl: `http://localhost:${port}`,
      baseHeaders: {},
    });

    client.getCoins({})
      .then(({ body, status }) => {
        if (status === 200 && body !== null) {
          console.log(body);
        }
      });
  }, []);

  const coinList: ReadonlyArray<Coin> = coinData.map((coin) => {
    const {
      name, image, size, value,
    } = coin;

    return {
      name,
      image,
      size,
      amount: Money.fromNumber(value, 'GBP'),
    };
  });

  return (
    <App coinList={coinList} data-testid="app" />
  );
}

export default AppContainer;
