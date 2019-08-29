import React, { useState, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import coinList from '../../data/coins';

import Slider from '../Slider';
import Coin from '../Coin';

import style from './App.module.scss';

const getRandomAmount = () => {
  const integer = Math.floor(Math.random() * 10);
  const fraction = Math.floor(Math.random() * 100) + 1;

  return Number.parseFloat(`${integer}.${fraction}`);
};

const getShuffeledCoins = arraySorted => shuffle(arraySorted);

function App() {
  const [targetAmount, setTargetAmount] = useState(getRandomAmount());
  const [currentAmount, setCurrentAmount] = useState(0);
  const [coins, setCoins] = useState(getShuffeledCoins(coinList));
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  useEffect(() => {
    const amountsAreMatching = (currentAmount.toFixed(2)) === (targetAmount.toFixed(2));

    setOverlayIsVisible(amountsAreMatching);
  }, [currentAmount, targetAmount, overlayIsVisible]);

  function resetState() {
    const newAmount = getRandomAmount();
    const newCoins = getShuffeledCoins(coinList);

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
      <header className={style.header}>
        <h1 className={style.title}>
          Header
        </h1>
        <dl className={style.details}>
          <dt className={style.detailsKey}>
            Target amount:
          </dt>
          <dt className={style.detailsValue}>
            {targetAmount.toFixed(2)}
          </dt>
          <dt className={style.detailsKey}>
            Current amount:
          </dt>
          <dt className={style.detailsValue}>
            {currentAmount.toFixed(2)}
          </dt>
        </dl>
        <button className={style.resetButton} onClick={resetState} type="button">
          Reset
        </button>
      </header>
      <main className={style.main}>
        <form className={style.form} onSubmit={handleSubmit} action="" method="">
          <Slider>
            {coins.map((coin, index) => (
              <Coin
                handleAmountChange={handleAmountChange}
                key={index}
                {...coin}
              />
            ))}
          </Slider>
        </form>
        {overlayIsVisible && (
          <aside className={style.overlay}>
            <p className={style.overlayText}>
              Purrfect!
            </p>
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;
