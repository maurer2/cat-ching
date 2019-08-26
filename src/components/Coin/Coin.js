import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';

import style from './Coin.module.scss';

function Coin({ name, value, image }) {
  const [amount, setAmount] = useState(0);
  const [titleIsVisible, setTitleIsVisible] = useState(false);
  const [htmlId] = useState(() => {
    const newId = uuidv1();
    
    return newId;
  });

  function handleAdd() {
    setAmount(amount + 1);
  }

  function handleClear() {
    setAmount(0);
  }

  function handleVisibilityToggle() {
    setTitleIsVisible(!titleIsVisible);
  }

  function handleChange(event) {
    const inputValue = event.currentTarget.value;
    const numberValue = inputValue.replace(/\D/,'');

    setAmount(numberValue);
  }

  return (
    <fieldset className={style.container}>
      <label className={style.header} htmlFor={htmlId}>
        {titleIsVisible && (
          <span className={style.title}>
            {name}
          </span>
        )}
        <img className={style.image} src={`/images/${image}`} alt="" />
      </label>
      <div className={style.buttonGroup}>
        <button className={style.button} onClick={handleAdd} id={htmlId}>
          Add
        </button>
        <button className={style.button} onClick={handleClear}>
          Clear
        </button>
        <button className={style.button} onClick={handleVisibilityToggle}>
          {titleIsVisible? 'Hide' : 'Show' } Title
        </button>
      </div>
      <input value={amount} className={style.input} type="text" readOnly disabled/>
    </fieldset>
  );
}

export default Coin;
