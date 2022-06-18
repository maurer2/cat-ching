import React, { useState } from 'react';

import Money from '../../types/Money';

import style from './Footer.module.scss';

function Footer({ currentAmount }) {
  const [showCurrentAmount, setShowCurrentAmount] = useState(true);
  const targetValue = (currentAmount as Money).valueAsFormattedString;

  function toggleAmountVisibility() {
    setShowCurrentAmount(!showCurrentAmount);
  }

  return (
    <footer className={style.footer}>
      {showCurrentAmount && (
        <dl className={style.detail}>
          <dt className={style.detailKey}>
            Current amount:
          </dt>
          <dd className={style.detailValue}>
            {targetValue}
          </dd>
        </dl>
      )}
      <button
        className={style.toggleButton}
        onClick={toggleAmountVisibility}
        type="button"
      >
        {showCurrentAmount ? 'Hide current amount' : 'Show current amount' }
      </button>
    </footer>
  );
}

export default Footer;
