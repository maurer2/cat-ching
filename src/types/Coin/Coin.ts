import Money from '../Money';

type Millimeter = number;

type Coin = {
  name: string,
  image: string,
  amount: Money,
  size: {
    width: Millimeter,
    height: Millimeter,
    unit: string,
  },
};

export default Coin;
