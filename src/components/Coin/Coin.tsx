import React, { useState, useId } from 'react';

import style from './Coin.module.scss';
import * as Types from './Coin.types';

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

function Coin({
  coin: { name, image, amount, size },
  onAddAmount,
  onSubtractAmount,
}: Types.CoinProps): JSX.Element {
  const [showHint, setShowHint] = useState<boolean>(false);
  const currentId: string = useId();

  const width = calculateRelativeWidth(size.width).toFixed(2);

  function addAmount(): void {
    onAddAmount(amount);
  }

  function subtractAmount(): void {
    onSubtractAmount(amount);
  }

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
        <Button handleOnClick={subtractAmount}>Subtract amount</Button>
        <Button handleOnClick={toggleHintVisibility}>{showHint ? 'Hide hint' : 'Show hint'}</Button>
      </div>
    </fieldset>
  );
}

export default Coin;
