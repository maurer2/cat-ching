import React from 'react';

import App from '../App';

import coinData from '../../data/coins';
import Money from '../../data/money';

const getMoneyList = (Money, coinData) => {
  const moneyList = coinData.map((entry) => {
    const { name, value, image } = entry;

    const moneyObject = new Money(value, 'pound'); 

    return {
      name,
      image,
      value: moneyObject,
    }
  });

  return moneyList;
};

function AppContainer() {
  const moneyList = getMoneyList(Money, coinData)

  return (
    <App coinData={moneyList} />
  );
}

export default AppContainer;
