import Money from '../../types/Money';

export type CoinProps = {
  name: string,
  image: string,
  amount: Money,
  size: {
    width: string,
  },
  handleAmountChange: (amount: Money) => void,
};
