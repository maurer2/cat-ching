import React from 'react';

import Money from '../../types/Money';

import style from './Header.module.scss';

function Header({ targetAmount, handleReset }) {
  const targetValue = (targetAmount as Money).valueAsFormattedString;

  return (
    <header className={style.header}>
      <h1 className={style.title}>Cat-Ching</h1>
      <div className={style.details}>
        <dl className={style.detail}>
          <dt className={style.detailKey}>Target amount:</dt>
          <dd className={style.detailValue}>{targetValue}</dd>
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
