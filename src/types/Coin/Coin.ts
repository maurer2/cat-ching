import Money from '../Money';

type Coin = {
  name: string,
  image: string,
  amount: Money,
  size: {
    width: string,
    height: string,
    unit: string,
  },
};

export default Coin;
