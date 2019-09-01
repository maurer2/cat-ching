import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './Footer.module.scss';

function Footer({ currentAmount }) {
  const [showCurrentAmount, setShowCurrentAmount] = useState(true);

  function toggleAmountVisbility() {
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
            {currentAmount.valueFormatted}
          </dd>
        </dl>
      )}
      <button
        className={style.toggleButton}
        onClick={toggleAmountVisbility}
        type="button"
      >
        {showCurrentAmount ? 'Hide current amount' : 'Show current amount' }
      </button>
    </footer>
  );
}

export default Footer;

const { shape, number, string } = PropTypes;

Footer.propTypes = {
  currentAmount: shape({
    value: number.isRequired,
    currency: string.isRequired,
    valueInCents: number.isRequired,
    valueFormatted: string.isRequired,
  }).isRequired,
};
