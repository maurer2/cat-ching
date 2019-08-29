import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';

import style from './Coin.module.scss';

function Coin({ name, value, image, handleAmountChange }) {
  const [hintIsVisible, setHintIsVisible] = useState(false);
  const [htmlId] = useState(() => uuidv1());

  /*
  useEffect(() => {
    const totalValue = value * amount;

    handleAmountChange(totalValue.toFixed(2));
  }, [amount, value]);
  */

  function addAmount() {
    handleAmountChange(value);
  }

  function removeAmount() {
    handleAmountChange(-value);
  }

  function toggleHintVisibility() {
    setHintIsVisible(!hintIsVisible);
  }

  /*
  function handleChange(event) {
    const inputValue = event.currentTarget.value;
    const numberValue = inputValue.replace(/\D/,'');

    setAmount(numberValue);
  }
  */

  return (
    <fieldset className={style.container}>
      <label className={style.header} htmlFor={htmlId}>
        {hintIsVisible && (
          <span className={style.title}>
            {name}
          </span>
        )}
        <img className={style.image} src={`/images/${image}`} alt="" />
      </label>
      <div className={style.buttonGroup}>
        <button
          className={style.button}
          onClick={addAmount}
          id={htmlId}
          type="button"
        >
          Add amount
        </button>
        <button
          className={style.button}
          onClick={removeAmount}
          type="button"
        >
          Remove amount
        </button>
        <button
          className={style.button}
          onClick={toggleHintVisibility}
          type="button"
        >
          {hintIsVisible ? 'Hide' : 'Show' }
          hint
        </button>
      </div>
    </fieldset>
  );
}

export default Coin;

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  handleAmountChange: PropTypes.func.isRequired,
};
