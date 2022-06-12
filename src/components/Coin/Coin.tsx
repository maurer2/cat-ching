import React, { useState, useId } from 'react';
import PropTypes from 'prop-types';

import style from './Coin.module.scss';

function Button({ handleOnClick, id, children }) {
  return (
    <button
      className={style.button}
      onClick={handleOnClick}
      id={id}
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

  const width = calculateRelativeWidth(size.width).toFixed(2);

  function addAmount(): void {
    handleAmountChange(amount.valueInCents);
  }

  function removeAmount(): void {
    handleAmountChange(amount.valueInCents * -1);
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
        <Button
          handleOnClick={addAmount}
          id={currentId}
        >
          Add amount
        </Button>
        <Button handleOnClick={removeAmount}>Remove amount</Button>
        <Button handleOnClick={toggleHintVisibility}>{showHint ? 'Hide hint' : 'Show hint'}</Button>
      </div>
    </fieldset>
  );
}

export default Coin;

const { string, number, func, shape, node } = PropTypes;

Coin.propTypes = {
  name: string.isRequired,
  amount: shape({
    value: number.isRequired,
    currency: string.isRequired,
    valueInCents: number.isRequired,
    valueFormatted: string.isRequired,
  }).isRequired,
  image: string.isRequired,
  handleAmountChange: func.isRequired,
  size: shape({
    width: number.isRequired,
    height: number.isRequired,
    unit: string.isRequired,
  }).isRequired,
};

Button.propTypes = {
  handleOnClick: func.isRequired,
  id: string,
  children: node.isRequired,
};

Button.defaultProps = {
  id: undefined,
};
