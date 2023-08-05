import type { Reducer } from 'react';
import React, {
  useReducer, useMemo, useCallback,
} from 'react';

import Header from '../Header';
import Slider from '../Slider';
import Coin from '../Coin';
import Footer from '../Footer';
import Overlay from '../Overlay';

import Money from '../../types/Money';
import type { Coin as CoinType } from '../../types/Coin';

import style from './App.module.scss';
import moneyReducers from './moneyReducers';
import type { CoinsWithStableKeys, AppProps } from './App.types';
import type { State, Actions, ActionTypeKeys } from './moneyReducers/money.reducers.types';
import { actionTypeValues } from './moneyReducers/money.reducers.types';
import useArrayShuffle from '../../hooks/useArrayShuffle';

function App({ coinList }: AppProps): JSX.Element {
  const [coins, setCoins] = useArrayShuffle<CoinType>(coinList);
  const [amounts, setAmounts] = useReducer<Reducer<State, Actions<ActionTypeKeys>>>(moneyReducers, {
    targetAmount: Money.fromRandom('GBP'),
    currentAmount: Money.fromNumber(0, 'GBP'),
  });
  // add stable keys (until next shuffle) to work around react reusing elements on refresh
  const coinsWithStableKeys = useMemo<CoinsWithStableKeys>(() => {
    const randomKeySuffix = (Math.random() * 100_000).toFixed(0);
    const keyedCoins: CoinsWithStableKeys = coins.map((coin) => ({
      key: `${coin.name}-${randomKeySuffix}`,
      coin,
    }));

    return keyedCoins;
  }, [coins]);
  const overlayIsVisible: boolean = amounts.currentAmount.isEqualTo(amounts.targetAmount);

  const handleReset = useCallback((): void => {
    setAmounts({
      type: actionTypeValues.RESET_STATE,
    });
    setCoins();
  }, [setCoins]);

  return (
    <div
      className={style.container}
      data-testid="app"
    >
      <Header
        targetAmount={amounts.targetAmount}
        onReset={handleReset}
      />
      <main className={style.main}>
        <Slider>
          {coinsWithStableKeys.map(({ key, coin }) => (
            <Coin
              key={key}
              coin={coin}
              onAddAmount={(amount) => {
                setAmounts({
                  type: actionTypeValues.ADD_TO_CURRENT_AMOUNT,
                  payload: amount,
                });
              }}
              onSubtractAmount={(amount) => {
                setAmounts({
                  type: actionTypeValues.SUBTRACT_FROM_CURRENT_AMOUNT,
                  payload: amount,
                });
              }}
            />
          ))}
        </Slider>
      </main>
      <Footer currentAmount={amounts.currentAmount} />
      {overlayIsVisible && <Overlay onReset={handleReset} />}
    </div>
  );
}

export default App;
