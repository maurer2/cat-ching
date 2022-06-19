import Money from '../../types/Money';
import Coin from '../../types/Coin';

export type CoinProps = {
  coin: Coin,
  handleAmountChange: (amount: Money) => void,
};
