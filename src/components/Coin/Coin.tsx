/* eslint-disable react/prop-types */
import React, { useState, useId } from 'react';

import Money from '../../types/Money';

import style from './Coin.module.scss';

function Button({ handleOnClick, children }) {
  return (
    <button
      className={style.button}
      onClick={handleOnClick}
      type="button"
    >
      {children}
    </button>
  );
}

// temp
const largestWidth = 28.4;
const calculateRelativeWidth = (width) => (width * 100) / largestWidth;

function Coin({ name, image, amount, size, handleAmountChange }) {
  const [showHint, setShowHint] = useState<boolean>(false);
  const currentId: string = useId();
  const targetValue = amount as Money;

  const width = calculateRelativeWidth(size.width).toFixed(2);

  function addAmount(): void {
    handleAmountChange(targetValue);
  }

  // function removeAmount(): void {
  // handleAmountChange(targetValue * -1);
  // }

  function toggleHintVisibility(): void {
    setShowHint(!showHint);
  }

  return (
    <fieldset className={style.container}>
      <label
        className={style.header}
        htmlFor={currentId}
      >
        {showHint && <span className={style.title}>{name}</span>}
        <img
          className={style.image}
          src={`/images/${image}`}
          style={{
            width: `${width}%`,
          }}
          alt=""
        />
      </label>
      <div className={style.buttonGroup}>
        <Button handleOnClick={addAmount}>Add amount</Button>

        <Button handleOnClick={toggleHintVisibility}>{showHint ? 'Hide hint' : 'Show hint'}</Button>
      </div>
    </fieldset>
  );
}

export default Coin;
