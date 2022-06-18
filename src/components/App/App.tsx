/* eslint-disable react/prop-types */
import React, { useState, useReducer, useMemo } from 'react';
import shuffle from 'lodash.shuffle';

import Money from '../../types/Money';

import Header from '../Header';
import Slider from '../Slider';
import Coin from '../Coin';
import Footer from '../Footer';
import Overlay from '../Overlay';

import style from './App.module.scss';

const getRandomAmount = (): number => {
  const integer = Math.floor(Math.random() * 10);
  const fraction = Math.floor(Math.random() * 100) + 1;

  // todo
  // @ts-ignore
  return Number.parseInt(`${integer}.${fraction}` * 100, 10);
};

const getShuffledCoins = (arraySorted) => shuffle(arraySorted);

function App({ coinData }) {
  const [targetAmount, setTargetAmount] = useState<Money>(() => {
    const newAmount = getRandomAmount();

    return Money.fromNumber(newAmount, 'GBP');
  });
  const [currentAmount, setCurrentAmount] = useReducer((state: Money, newState: Money) => {
    const newCurrentAmount: Money = state.add(newState);

    if (newCurrentAmount.isNegative()) {
      return Money.fromNumber(0, 'GBP');
    }

    return newCurrentAmount;
  }, Money.fromNumber(0, 'GBP'));
  const [coins, setCoins] = useState(getShuffledCoins(coinData));
  const overlayIsVisible = useMemo<boolean>(
    () => currentAmount.isEqualTo(targetAmount),
    [currentAmount, targetAmount],
  );

  function resetState(): void {
    const newAmount = getRandomAmount();
    const newCoins = getShuffledCoins(coinData);

    setTargetAmount(Money.fromNumber(newAmount, 'GBP'));
    setCurrentAmount(Money.fromNumber(0, 'GBP'));
    setCoins(newCoins);
  }

  function handleSubmit(event): void {
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
          <Slider key={targetAmount.valueAsFormattedString}>
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
      {String(overlayIsVisible)}
      {overlayIsVisible && <Overlay />}
    </div>
  );
}

export default App;
