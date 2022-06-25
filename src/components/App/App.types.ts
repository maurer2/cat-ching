import Money from '../../types/Money';
import Coin from '../../types/Coin';

export type AppProps = {
  coinList: ReadonlyArray<Coin>;
};

export type CoinsWithStableKeys = ReadonlyArray<{
  key: string,
  coin: Coin
}>;

// reducer
export type MoneyReducerState = {
  targetAmount: Money,
  currentAmount: Money,
};

const moneyReducerActionTypes = [
  'ADD_TO_CURRENT_AMOUNT',
  'SUBTRACT_FROM_CURRENT_AMOUNT',
  'RESET_CURRENT_AMOUNT',
  'SET_RANDOM_TARGET_AMOUNT',
] as const;

export type MoneyReducerActionTypes = typeof moneyReducerActionTypes[number];

export type MoneyReducerAction = {
  type: MoneyReducerActionTypes;
  payload?: any; // todo add conditional type
};
