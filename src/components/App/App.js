import React, { useState, useEffect } from 'react';
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

  return Number.parseInt(`${integer}.${fraction}` * 100, 10);
};

const getShuffeledCoins = (arraySorted) => shuffle(arraySorted);

function App({ coinData }) {
  const [targetAmount, setTargetAmount] = useState(() => {
    const newAmount = getRandomAmount();

    return new Money(newAmount, 'Pound');
  });
  const [currentAmount, setCurrentAmount] = useState(new Money(0, 'Pound'));
  const [coins, setCoins] = useState(getShuffeledCoins(coinData));
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  useEffect(() => {
    const amountsAreMatching = (currentAmount.valueInCents === targetAmount.valueInCents);

    setOverlayIsVisible(amountsAreMatching);
  }, [currentAmount, targetAmount, overlayIsVisible]);

  function resetState() {
    const newAmount = getRandomAmount();
    const newCoins = getShuffeledCoins(coinData);

    setTargetAmount(new Money(newAmount, 'Pound'));
    setCurrentAmount(new Money(0, 'Pound'));
    setCoins(newCoins);
  }

  function handleAmountChange(newAmount) {
    const newCurrentAmount = currentAmount.valueInCents + newAmount;

    if (newCurrentAmount <= 0) {
      setCurrentAmount(new Money(0, 'Pound'));
      return;
    }

    setCurrentAmount(new Money(newCurrentAmount, 'Pound'));
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
                handleAmountChange={handleAmountChange}
                key={coin.name}
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
