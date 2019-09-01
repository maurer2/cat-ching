import React, { useState } from 'react';
import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';

import style from './Coin.module.scss';

const Button = ({ handleOnClick, id, children }) => (
  <button
    className={style.button}
    onClick={handleOnClick}
    id={id}
    type="button"
  >
    { children }
  </button>
);

function Coin({ name, image, amount, handleAmountChange }) {
  const [showHint, setShowHint] = useState(false);
  const htmlId = React.useRef(uuidv1());

  function addAmount() {
    handleAmountChange(amount.valueInCents);
  }

  function removeAmount() {
    handleAmountChange(-amount.valueInCents);
  }

  function toggleHintVisibility() {
    setShowHint(!showHint);
  }

  return (
    <fieldset className={style.container}>
      <label className={style.header} htmlFor={htmlId.current}>
        {showHint && (
          <span className={style.title}>
            {name}
          </span>
        )}
        <img className={style.image} src={`/images/${image}`} alt="" />
      </label>
      <div className={style.buttonGroup}>
        <Button handleOnClick={addAmount} id={htmlId.current}>
          Add amount
        </Button>
        <Button handleOnClick={removeAmount}>
          Remove amount
        </Button>
        <Button handleOnClick={toggleHintVisibility}>
          {showHint ? 'Hide hint' : 'Show hint' }
        </Button>
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
};

Button.propTypes = {
  handleOnClick: func.isRequired,
  id: string,
  children: node.isRequired,
};

Button.defaultProps = {
  id: undefined,
};
