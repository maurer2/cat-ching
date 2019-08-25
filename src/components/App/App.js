import React, { useState } from 'react';
import Slider from '../Slider/Slider';
import Slide from '../Slide/Slide';
import Coin from '../Coin/Coin';

import shuffle from 'lodash.shuffle';
import style from './App.module.scss';

const coinList = [
  {
    name: '1 Pound',
    value: '1',
    image: '',
  },
  {
    name: '2 Pound',
    value: '2',
    image: '',
  },
  {
    name: '1 Penny',
    value: '0.01',
    image: '',
  },
  {
    name: '2 Pennies',
    value: '0.02',
    image: '',
  },
  {
    name: '5 Pennies',
    value: '0.05',
    image: '',
  },
]; 

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
          {coins.map((coin) => (
            <Slide key={coin.name}>
              <Coin name={coin.name} value={coin.value} />
            </Slide>
          ))}
        </Slider>
      </main>
    </div>
  );
}

export default App;
