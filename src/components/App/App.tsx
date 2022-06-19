import React, { useState, useReducer, ReducerWithoutAction, Reducer } from 'react';
import { shuffle } from 'lodash-es';

import Header from '../Header';
import Slider from '../Slider';
import Coin from '../Coin';
import Footer from '../Footer';
import Overlay from '../Overlay';

import Money from '../../types/Money';
import CoinType from '../../types/Coin';

import style from './App.module.scss';
import * as Types from './App.types';

function App({ coinList }: Types.AppProps): JSX.Element {
  const [coins, setCoins] = useReducer<ReducerWithoutAction<ReadonlyArray<CoinType>>>(
    (state) => shuffle(state),
    shuffle(coinList),
  );
  const [targetAmount, setTargetAmount] = useState<Money>(() => Money.fromRandom('GBP'));
  const [currentAmount, setCurrentAmount] = useReducer<Reducer<Money, Money>>((state, newState) => {
    const newCurrentAmount: Money = state.add(newState);

    if (newCurrentAmount.isNegative()) {
      return Money.fromNumber(0, 'GBP');
    }

    return newCurrentAmount;
  }, Money.fromNumber(0, 'GBP'));
  const overlayIsVisible: boolean = currentAmount.isEqualTo(targetAmount);

  function resetState(): void {
    setTargetAmount(Money.fromRandom('GBP'));
    setCurrentAmount(Money.fromNumber(0, 'GBP'));
    setCoins();
  }

  function handleSubmit(event): void {
    event.preventDefault();
  }

  return (
    <div className={style.container}>
      <Header
        targetAmount={targetAmount}
        handleReset={resetState}
      />
      <main className={style.main}>
        <form
          className={style.form}
          onSubmit={handleSubmit}
          action=""
          method=""
        >
          <Slider key={targetAmount.valueAsFormattedString}>
            {coins.map((coin) => (
              <Coin
                key={coin.name}
                name={coin.name}
                image={coin.image}
                amount={coin.amount}
                handleAmountChange={setCurrentAmount}
                size={coin.size}
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
