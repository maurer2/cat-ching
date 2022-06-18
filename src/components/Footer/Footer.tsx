import React, { useReducer } from 'react';

import style from './Footer.module.scss';
import * as Types from './Footer.types';

function Footer({ currentAmount }: Types.FooterProps): JSX.Element {
  const [showCurrentAmount, toggleShowCurrentAmount] = useReducer((state: boolean) => !state, true);

  return (
    <footer className={style.footer}>
      {showCurrentAmount && (
        <dl className={style.detail}>
          <dt className={style.detailKey}>Current amount:</dt>
          <dd className={style.detailValue}>{currentAmount.valueAsFormattedString}</dd>
        </dl>
      )}
      <button
        className={style.toggleButton}
        onClick={toggleShowCurrentAmount}
        type="button"
      >
        {showCurrentAmount ? 'Hide current amount' : 'Show current amount'}
      </button>
    </footer>
  );
}

export default Footer;
