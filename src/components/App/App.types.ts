import Coin from '../../types/Coin';
// import Money from '../../types/Money';

export type AppProps = {
  coinList: ReadonlyArray<Coin>;
};

const moneyReducerActionNames = [
  'ADD_AMOUNT',
  'SUBTRACT_AMOUNT',
  'RESET_AMOUNT',
  'SET_RANDOM_AMOUNT',
] as const;

export type MoneyReducerActionNamesType = typeof moneyReducerActionNames[number];

export type MoneyReducerActions = {
  type: MoneyReducerActionNamesType;
  payload?: any; // todo add conditional type
};
