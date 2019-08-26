import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';

import style from './Coin.module.scss';

function Coin({ name, value, image }) {
  const [amount, setAmount] = useState(0);

  const [htmlId] = useState(() => {
    const newId = uuidv1();
    
    return newId;
  });

  function handleAdd() {
    const oldAmount = amount;

    setAmount(oldAmount + 1);
  }

  function handleClear() {
    setAmount(0);
    console.log(name, 'clicked');
  }

  function handleChange(event) {
    const inputValue = event.currentTarget.value;
    const numberValue = inputValue.replace(/\D/,'');

    setAmount(numberValue);
  }

  return (
    <fieldset className={style.container}>
      <label className={style.header} htmlFor={htmlId}>
        <span className={style.title}>
          {name}
        </span>
        <img className={style.image} src={`/images/${image}`} alt="" />
      </label>
      <div className={style.buttonGroup}>
        <button className={style.button} onClick={handleAdd} id={htmlId}>
          Add
        </button>
        <button className={style.button} onClick={handleClear}>
          Clear
        </button>
      </div>
      <input value={amount} className={style.input} type="text" readOnly disabled />
    </fieldset>
  );
}

export default Coin;
