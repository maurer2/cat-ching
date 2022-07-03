import React, {
  useId, useReducer, ReducerWithoutAction, useMemo,
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

  function addAmount(): void {
    onAddAmount(amount);
  }

  function subtractAmount(): void {
    onSubtractAmount(amount);
  }

  return (
    <div className={style.container} data-testid="coin">
      <label
        className={style.header}
        htmlFor={currentId}
      >
        <span className={`${showHint ? style.title : style['title--hidden']}`}>
          {name}
        </span>
        <img
          className={style.image}
          src={`/images/${image}`}
          style={{
            width: `${calculatedWidth}%`,
          }}
          alt="Coin"
        />
      </label>
      <div className={style.buttonGroup}>
        <Button handleOnClick={addAmount}>Add amount</Button>
        <Button handleOnClick={subtractAmount}>Subtract amount</Button>
        <Button handleOnClick={setShowHint}>{showHint ? 'Hide hint' : 'Show hint'}</Button>
      </div>
    </div>
  );
}

export default Coin;
