import type Money from '../../types/Money';
import type { Coin } from '../../types/Coin';

export type CoinProps = {
  coin: Coin,
  onAddAmount: (amount: Money) => void,
  onSubtractAmount: (amount: Money) => void,
};

export type ButtonProps = {
  handleOnClick: () => void
};
