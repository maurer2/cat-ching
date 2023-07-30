import React, { useReducer, ReducerWithoutAction } from 'react';
import clsx from 'clsx';

import style from './Footer.module.scss';
import * as Types from './Footer.types';

function Footer({ currentAmount }: Types.FooterProps): JSX.Element {
  const [showCurrentAmount, toggleShowCurrentAmount] = useReducer<ReducerWithoutAction<boolean>>(
    (state) => !state,
    true,
  );

  return (
    <footer className={style.footer} data-testid="footer">
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
        <span
          className={clsx({ [style['hidden-text']]: !showCurrentAmount })}
          aria-hidden={!showCurrentAmount}
        >
          Hide current amount
        </span>
        <span
          className={clsx({ [style['hidden-text']]: showCurrentAmount })}
          aria-hidden={showCurrentAmount}
        >
          Show current amount
        </span>
      </button>
    </footer>
  );
}

export default Footer;
