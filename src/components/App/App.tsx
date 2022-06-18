import React, { useState, useReducer, useMemo } from 'react';
import shuffle from 'lodash.shuffle';

import Header from '../Header';
import Slider from '../Slider';
import Coin from '../Coin';
import Footer from '../Footer';
import Overlay from '../Overlay';

import Money from '../../types/Money';
import CoinType from '../../types/Coin';

import style from './App.module.scss';
import * as Types from './App.types';

const getRandomAmount = (): number => {
  const integer = Math.floor(Math.random() * 10);
  const fraction = Math.floor(Math.random() * 100) + 1;

  // todo
  // @ts-ignore
  return Number.parseInt(`${integer}.${fraction}` * 100, 10);
};

function App({ coinList }: Types.AppProps): JSX.Element {
  const [coins, setCoins] = useReducer(
    (state: ReadonlyArray<CoinType>) => shuffle(state) as ReadonlyArray<CoinType>,
    shuffle(coinList) as ReadonlyArray<CoinType>,
  );
  const [targetAmount, setTargetAmount] = useState<Money>(() => {
    const newAmount = getRandomAmount();

    return Money.fromNumber(newAmount, 'GBP');
  });
  const [currentAmount, setCurrentAmount] = useReducer((state: Money, newState: Money) => {
    const newCurrentAmount: Money = state.add(newState);

    if (newCurrentAmount.isNegative()) {
      return Money.fromNumber(0, 'GBP');
    }

    return newCurrentAmount;
  }, Money.fromNumber(0, 'GBP'));
  const overlayIsVisible = useMemo<boolean>(
    () => currentAmount.isEqualTo(targetAmount),
    [currentAmount, targetAmount],
  );

  function resetState(): void {
    const newAmount = getRandomAmount();

    setTargetAmount(Money.fromNumber(newAmount, 'GBP'));
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
