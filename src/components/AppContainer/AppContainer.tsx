import React from 'react';

import App from '../App';
import Money from '../../types/Money';

import coinData from '../../data/coins';
import Coin from '../../types/Coin';

function AppContainer() {
  const coinList: ReadonlyArray<Coin> = coinData.map((coin) => {
    const { name, image, size, value } = coin;

    return {
      name,
      image,
      size,
      amount: Money.fromNumber(value, 'GBP'),
    };
  });

  return (
    <App coinList={coinList} />
  );
}

export default AppContainer;
