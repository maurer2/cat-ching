import React, {
  useReducer, ReducerWithoutAction, useMemo, useCallback,
} from 'react';
import clsx from 'clsx';

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

const largestWidth = 28.4;

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
  const calculatedWidth: string = useMemo(() => {
    const currenWidth = (width * 100) / largestWidth;

    return currenWidth.toFixed(5);
  }, [width]);

  const addAmount = useCallback(() => {
    onAddAmount(amount);
  }, [onAddAmount, amount]);

  const subtractAmount = useCallback(() => {
    onSubtractAmount(amount);
  }, [onSubtractAmount, amount]);

  return (
    <div className={style.container} data-testid="coin">
      <figure className={style['image-container']}>
        <figcaption className={`${showHint ? style.title : style['title--hidden']}`}>
          {name}
        </figcaption>
        <img
          className={style.image}
          src={`/images/${image}`}
          style={{
            width: `${calculatedWidth}%`,
          }}
          alt="Coin"
        />
      </figure>
      <div className={style['button-group']}>
        <Button handleOnClick={addAmount}>Add amount</Button>
        <Button handleOnClick={subtractAmount}>Subtract amount</Button>
        <Button handleOnClick={setShowHint}>
          <span
            className={clsx({ [style['hidden-text']]: !showHint })}
            aria-hidden={!showHint}
          >
            Hide hint
          </span>
          <span
            className={clsx({ [style['hidden-text']]: showHint })}
            aria-hidden={showHint}
          >
            Show hint
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Coin;
