import Coin from '../../types/Coin';

export type AppProps = {
  coinList: ReadonlyArray<Coin>;
};

export type CoinsWithStableKeys = ReadonlyArray<{
  key: string;
  coin: Coin;
}>;
