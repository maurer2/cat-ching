import React, { useState } from 'react';
import shuffle from 'lodash.shuffle';
import style from './App.module.css';

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
  const factionalPart = Math.floor(Math.random() * 100) + 1;
  
  return Number.parseFloat(`${integerPart}.${factionalPart}`);
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
      {coins.map((coin) => (
        <span>
          {coin.name}
          {coin.value}
        </span>
      ))}
      </main>
    </div>
  );
}

export default App;
