import React, { useState } from 'react';
import shuffle from 'lodash.shuffle';
import { coinList } from '../../data/coins.js';

import Slider from '../Slider/Slider';
import Coin from '../Coin/Coin';

import style from './App.module.scss';

const getRandomAmount = () => {
  const integerPart = Math.floor(Math.random() * 10);
  const fractionalPart = Math.floor(Math.random() * 100) + 1;
  
  return Number.parseFloat(`${integerPart}.${fractionalPart}`);
}

const getShuffeledCoins = (arraySorted) => shuffle(arraySorted);

function App() {
  const [amount, setAmount] = useState(getRandomAmount());
  const [coins, setCoins] = useState(getShuffeledCoins(coinList));

  function resetState() {
    const newAmount = getRandomAmount();
    const newCoins = getShuffeledCoins(coinList);
    
    setAmount(newAmount);
    setCoins(newCoins);
  }

  return (
    <div className={style.app}>
      <header className={style.header}>
        Header
        <div>{amount.toFixed(2)}</div>
        <button type="button" onClick={resetState}>
          Reset
        </button>
      </header>
      <main className={style.main}>
        <Slider>
          {coins.map((coin, index) => (
            <Coin {...coin} key={index}/>
          ))}
        </Slider>
      </main>
    </div>
  );
}

export default App;
