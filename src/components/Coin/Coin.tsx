/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useId, useReducer, ReducerWithoutAction, useMemo, useCallback,
} from 'react';

import style from './Coin.module.scss';
import * as Types from './Coin.types';

function Button({ handleOnClick, children }) {
  return (
    <button
      className={style.button}
      onClick={handleOnClick}
      type="button"
    >
      {children}
    </button>
  );
}

function Coin({
  coin: {
    name, image, amount, size: { width },
  },
  onAddAmount,
  onSubtractAmount,
}: Types.CoinProps): JSX.Element {
  const [showHint, setShowHint] = useReducer<ReducerWithoutAction<boolean>>(
    (state) => !state,
    false,
  );
  const currentId: string = useId();
  const calculatedWidth: string = useMemo(() => {
    const largestWidth = 28.4;
    const currenWidth = (width * 100) / largestWidth;

    return currenWidth.toFixed(5);
  }, [width]);

  const addAmount = useCallback(() => {
    onAddAmount(amount);
  }, [onAddAmount, amount]);

  const subtractAmount = useCallback(() => {
    onSubtractAmount(amount);
  }, [onSubtractAmount, amount]);

  const toggleActiveState = useCallback(() => {
    console.log(amount);
  }, [amount]);

  return (
    <div className={style.container} data-testid="coin">
      <span hidden>is active</span>
      <button
        type="button"
        className={style.button}
        onClick={toggleActiveState}
      >
        <figure className={style['image-wrapper']}>
          <img
            className={style.image}
            src={`/images/${image}`}
            style={{
              width: `${calculatedWidth}%`,
            }}
            alt="Coin"
          />
          <figcaption className={style.title}>
            {name}
          </figcaption>
        </figure>
      </button>
    </div>
  );
}

export default Coin;
