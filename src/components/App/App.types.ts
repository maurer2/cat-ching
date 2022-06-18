import Money from '../../types/Money';

export type AppProps = {
  coinData: ReadonlyArray<{
    amount: Money;
    image: string;
    name: string;
    size: {
      width: string;
      height: string;
      unit: string;
    };
  }>;
};
