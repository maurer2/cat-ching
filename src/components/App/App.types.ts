import Coin from '../../types/Coin';
// import Money from '../../types/Money';

export type AppProps = {
  coinList: ReadonlyArray<Coin>;
};

const reducerActionNames = [
  'ADD_AMOUNT',
  'SUBTRACT_AMOUNT',
  'RESET_AMOUNT',
] as const;

export type ReducerActionNames = typeof reducerActionNames[number];

export type ReducerAction = {
  type: ReducerActionNames;
  payload?: any; // todo add conditional type
};
