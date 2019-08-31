import React from 'react';
import PropTypes from 'prop-types';

import style from './Header.module.scss';

function Header({ targetAmount, currentAmount, handleReset }) {
  const targetAmountFormatted = targetAmount.valueFormatted;
  const currentAmountFormatted = currentAmount.valueFormatted;

  return (
    <header className={style.header}>
      <h1 className={style.title}>
        Header
      </h1>
      <dl className={style.details}>
        <dt className={style.detailsKey}>
          Target amount:
        </dt>
        <dd className={style.detailsValue}>
          {targetAmountFormatted}
        </dd>
        <dt className={style.detailsKey}>
          Current amount:
        </dt>
        <dd className={style.detailsValue}>
          {currentAmountFormatted}
        </dd>
      </dl>
      <button
        className={style.resetButton}
        onClick={handleReset}
        type="button"
      >
        Reset
      </button>
    </header>
  );
}

export default Header;

Header.propTypes = {
  targetAmount: PropTypes.object.isRequired,
  currentAmount: PropTypes.object.isRequired,
  handleReset: PropTypes.func.isRequired,
};
