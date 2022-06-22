import Money from '../../types/Money';
import Coin from '../../types/Coin';

export type CoinProps = {
  coin: Coin,
  onAddAmount: (amount: Money) => void,
  onSubtractAmount: (amount: Money) => void,
};
