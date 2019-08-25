import React from 'react';
import style from './Coin.module.scss';

function Coin({ name, value }) {
  function handleClick() {
    console.log(name, 'clicked');
  }

  return (
    <button className={style.container} onClick={handleClick}>
      <span>{name}</span>
      <span>{value}</span>
    </button>
  );
}

export default Coin;
