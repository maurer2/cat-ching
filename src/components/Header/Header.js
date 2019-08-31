import React from 'react';
import PropTypes from 'prop-types';

import style from './Header.module.scss';

function Header({ targetAmount, currentAmount, handleReset }) {
  return (
    <header className={style.header}>
      <h1 className={style.title}>
        Header
      </h1>
      <div className={style.details}>
        <dl className={style.detail}>
          <dt className={style.detailKey}>
            Target amount:
          </dt>
          <dd className={style.detailValue}>
            {targetAmount.valueFormatted}
          </dd>
        </dl>
        <dl className={style.detail}>
          <dt className={style.detailKey}>
            Current amount:
          </dt>
          <dd className={style.detailValue}>
            {currentAmount.valueFormatted}
          </dd>
        </dl>
      </div>
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

const { string, number, func, shape } = PropTypes;

Header.propTypes = {
  targetAmount: shape({
    value: number.isRequired,
    currency: string.isRequired,
    valueInCents: number.isRequired,
    valueFormatted: string.isRequired,
  }).isRequired,
  currentAmount: shape({
    value: number.isRequired,
    currency: string.isRequired,
    valueInCents: number.isRequired,
    valueFormatted: string.isRequired,
  }).isRequired,
  handleReset: func.isRequired,
};
