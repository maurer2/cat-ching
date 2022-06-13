import React, { useState, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';

import Money from '../../data/money';

import Header from '../Header';
import Slider from '../Slider';
import Coin from '../Coin';
import Overlay from '../Overlay';
import Footer from '../Footer';

import style from './App.module.scss';

const getRandomAmount = () => {
  const integer = Math.floor(Math.random() * 10);
  const fraction = Math.floor(Math.random() * 100) + 1;

  // todo
  // @ts-ignore
  return Number.parseInt(`${integer}.${fraction}` * 100, 10);
};

const getShuffledCoins = (arraySorted) => shuffle(arraySorted);

function App({ coinData }) {
  const [targetAmount, setTargetAmount] = useState(() => {
    const newAmount = getRandomAmount();

    return new Money(newAmount, 'Pound');
  });
  const [currentAmount, setCurrentAmount] = useReducer((state, action) => {
    const newCurrentAmount = state.valueInCents + action;

    if (newCurrentAmount <= 0) {
      return new Money(0, 'Pound');
    }

    return new Money(newCurrentAmount, 'Pound');
  }, new Money(0, 'Pound'));
  const [coins, setCoins] = useState(getShuffledCoins(coinData));
  const overlayIsVisible = useMemo<boolean>(
    // @ts-ignore
    () => currentAmount.valueInCents === targetAmount.valueInCents,
    [currentAmount, targetAmount],
  );

  function resetState(): void {
    const newAmount = getRandomAmount();
    const newCoins = getShuffledCoins(coinData);

    setTargetAmount(new Money(newAmount, 'Pound'));
    setCurrentAmount(new Money(0, 'Pound'));
    setCoins(newCoins);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={style.container}>
      <Header
        targetAmount={targetAmount}
        handleReset={resetState}
      />
      <main className={style.main}>
        <form
          className={style.form}
          onSubmit={handleSubmit}
          action=""
          method=""
        >
          <Slider key={targetAmount.valueFormatted}>
            {coins.map((coin) => (
              <Coin
                name={coin.name}
                image={coin.image}
                amount={coin.amount}
                handleAmountChange={setCurrentAmount}
                key={coin.name}
                size={coin.size}
              />
            ))}
          </Slider>
        </form>
      </main>
      <Footer currentAmount={currentAmount} />
      {overlayIsVisible && <Overlay />}
    </div>
  );
}

export default App;

const { string, number, shape, arrayOf } = PropTypes;

App.propTypes = {
  coinData: arrayOf(
    shape({
      amount: shape({
        value: number.isRequired,
        currency: string.isRequired,
        valueInCents: number.isRequired,
        valueFormatted: string.isRequired,
      }).isRequired,
      image: string.isRequired,
      name: string.isRequired,
    }),
  ).isRequired,
};
