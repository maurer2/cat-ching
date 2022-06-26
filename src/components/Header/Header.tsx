import React from 'react';

import style from './Header.module.scss';
import * as Types from './Header.types';

function Header({ targetAmount, onReset }: Types.HeaderProps): JSX.Element {
  return (
    <header className={style.header}>
      <h1 className={style.title}>Cat-Ching</h1>
      <dl className={style.detail}>
        <dt className={style.detailKey}>Target amount:</dt>
        <dd className={style.detailValue}>{targetAmount.valueAsFormattedString}</dd>
      </dl>
      <button
        className={style.resetButton}
        onClick={onReset}
        type="button"
      >
        Reset
      </button>
    </header>
  );
}

export default Header;
