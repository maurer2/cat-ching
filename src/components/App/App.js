import React, { useState, useEffect } from 'react';
import shuffle from 'lodash.shuffle';

import Header from '../Header';
import Slider from '../Slider';
import Coin from '../Coin';
import Overlay from '../Overlay';

import style from './App.module.scss';

const getRandomAmount = () => {
  const integer = Math.floor(Math.random() * 10);
  const fraction = Math.floor(Math.random() * 100) + 1;

  return Number.parseFloat(`${integer}.${fraction}`);
};

const getShuffeledCoins = arraySorted => shuffle(arraySorted);

function App({coinData}) {
  const [targetAmount, setTargetAmount] = useState(getRandomAmount());
  const [currentAmount, setCurrentAmount] = useState(0);
  const [coins, setCoins] = useState(getShuffeledCoins(coinData));
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  useEffect(() => {
    const amountsAreMatching = (currentAmount.toFixed(2)) === (targetAmount.toFixed(2));

    setOverlayIsVisible(amountsAreMatching);
  }, [currentAmount, targetAmount, overlayIsVisible]);

  function resetState() {
    const newAmount = getRandomAmount();
    const newCoins = getShuffeledCoins(coinData);

    setTargetAmount(newAmount);
    setCurrentAmount(0);
    setCoins(newCoins);
  }

  function handleAmountChange(newAmount) {
    const newCurrentAmount = currentAmount + parseFloat(newAmount);

    if (newCurrentAmount <= 0) {
      setCurrentAmount(0);
      return;
    }

    setCurrentAmount(newCurrentAmount);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={style.container}>
      <Header
        targetAmount={targetAmount}
        currentAmount={currentAmount}
        handleReset={resetState}
      />
      <main className={style.main}>
        <form
          className={style.form}
          onSubmit={handleSubmit}
          action=""
          method=""
        >
          <Slider>
            {coins.map(coin => (
              <Coin
                handleAmountChange={handleAmountChange}
                key={coin.name}
                {...coin}
              />
            ))}
          </Slider>
        </form>
        {overlayIsVisible && <Overlay />}
      </main>
    </div>
  );
}

export default App;
