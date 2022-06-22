import React, { useState, useReducer, ReducerWithoutAction, Reducer, FormEvent } from 'react';
import { shuffle } from 'lodash-es';

import Header from '../Header';
import Slider from '../Slider';
import Coin from '../Coin';
import Footer from '../Footer';
import Overlay from '../Overlay';

import Money from '../../types/Money';
import CoinType from '../../types/Coin';

import style from './App.module.scss';
import { moneyReducer } from './App.reducers';
import * as Types from './App.types';

function App({ coinList }: Types.AppProps): JSX.Element {
  const [coins, setCoins] = useReducer<ReducerWithoutAction<ReadonlyArray<CoinType>>>(
    (state) => shuffle(state),
    shuffle(coinList),
  );
  const [targetAmount, setTargetAmount] = useState<Money>(() => Money.fromRandom('GBP'));
  const [currentAmount, setCurrentAmount] = useReducer<Reducer<Money, Types.ReducerAction>>(
    moneyReducer,
    Money.fromNumber(0, 'GBP'),
  );
  const overlayIsVisible: boolean = currentAmount.isEqualTo(targetAmount);

  function handleResetState(): void {
    setTargetAmount(Money.fromRandom('GBP'));
    setCurrentAmount({
      type: 'RESET_AMOUNT',
    });
    setCoins();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(targetAmount, currentAmount);
  }

  function handleAddAmount(amount: Money): void {
    setCurrentAmount({
      type: 'ADD_AMOUNT',
      payload: amount,
    });
  }

  function handleSubtractAmount(amount: Money): void {
    setCurrentAmount({
      type: 'SUBTRACT_AMOUNT',
      payload: amount,
    });
  }

  return (
    <div className={style.container}>
      <Header
        targetAmount={targetAmount}
        handleReset={handleResetState}
      />
      <main className={style.main}>
        <form
          className={style.form}
          onSubmit={handleSubmit}
          onReset={handleResetState}
          action=""
          method=""
        >
          <Slider key={targetAmount.valueAsFormattedString}>
            {coins.map((coin) => (
              <Coin
                key={coin.name}
                coin={coin}
                onAddAmount={handleAddAmount}
                onSubtractAmount={handleSubtractAmount}
              />
            ))}
          </Slider>
        </form>
      </main>
      <Footer currentAmount={currentAmount} />
      {overlayIsVisible && <Overlay />}
    </div>
  );
}

export default App;
