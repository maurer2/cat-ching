import React, { useState } from 'react';
import shuffle from 'lodash.shuffle';
import { coinList } from '../../data/coins.js';

import Slider from '../Slider/Slider';
import Coin from '../Coin/Coin';

import style from './App.module.scss';

const getRandomAmount = () => {
  const integer = Math.floor(Math.random() * 10);
  const fraction = Math.floor(Math.random() * 100) + 1;
  
  return Number.parseFloat(`${integer}.${fraction}`);
}

const getShuffeledCoins = (arraySorted) => shuffle(arraySorted);

function App() {
  const [targetAmount, setTargetAmount] = useState(getRandomAmount());
  const [currentAmount, setCurrentAmount] = useState(0);
  const [coins, setCoins] = useState(getShuffeledCoins(coinList));

  function resetState() {
    const newAmount = getRandomAmount();
    const newCoins = getShuffeledCoins(coinList);
    
    setTargetAmount(newAmount);
    setCurrentAmount(0);
    setCoins(newCoins);
  }

  function handleAmountChange(newAmount) {
    const oldCurrentAmount = currentAmount;
    const newCurrentAmount = oldCurrentAmount + parseFloat(newAmount);

    setCurrentAmount(newCurrentAmount);
  }

  return (
    <div className={style.app}>
      <header className={style.header}>
        Header
        <div>Target: {targetAmount.toFixed(2)}</div>
        <div>Current amount: {currentAmount.toFixed(2)}</div>
        <button type="button" onClick={resetState}>
          Reset coin order and target amount
        </button>
      </header>
      <main className={style.main}>
        <Slider>
          {coins.map((coin, index) => (
            <Coin
              handleAmountChange={handleAmountChange}
              key={index}
              {...coin}
            />
          ))}
        </Slider>
      </main>
    </div>
  );
}

export default App;
