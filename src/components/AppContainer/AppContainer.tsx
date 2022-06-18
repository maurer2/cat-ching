import React from 'react';

import App from '../App';
import Money from '../../types/Money';

import coinData from '../../data/coins';

const getMoneyList = () => {
  const moneyList = coinData.map((entry) => {
    const { name, image, size, value } = entry;

    return {
      name,
      image,
      size,
      amount: Money.fromNumber(value, 'GBP'),
    };
  });

  return moneyList;
};

function AppContainer() {
  const moneyList = getMoneyList();

  return (
    <App coinData={moneyList} />
  );
}

export default AppContainer;
