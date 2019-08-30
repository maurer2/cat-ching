import React from 'react';

import App from '../App';

import coinData from '../../data/coins';
import Money from '../../data/money';

const getCoins = (Money) => {
  const x = new Money(1, 'pound');

  console.log(x.valueInCents);
  console.log(x.valueFormatted);
};

function AppContainer() {
  return (
    <App coinData={coinData} />
  );
}

export default AppContainer;
