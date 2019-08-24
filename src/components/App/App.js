import React, { useState } from 'react';
// import logo from '../../logo.svg';
import style from './App.module.css';

const getRandomAmount = () => {
  const number = Math.floor(Math.random() * 100) + 1;
  
  return number;
}

function App() {
  const [amount, setAmount] = useState(getRandomAmount());

  return (
    <div className={style.app}>
      <header className={style.header}>
        Header
      </header>
      <main className={style.main}>
        Main
      </main>
    </div>
  );
}

export default App;
