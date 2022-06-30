import Money from '../../types/Money';
import Coin from '../../types/Coin';

export type AppProps = {
  coinList: ReadonlyArray<Coin>;
};

export type CoinsWithStableKeys = ReadonlyArray<{
  key: string;
  coin: Coin;
}>;

// reducer
export type MoneyReducerState = {
  targetAmount: Money;
  currentAmount: Money;
};

export const moneyReducerActionTypes = {
  ADD_TO_CURRENT_AMOUNT: 'ADD_TO_CURRENT_AMOUNT',
  SUBTRACT_FROM_CURRENT_AMOUNT: 'SUBTRACT_FROM_CURRENT_AMOUNT',
  RESET_STATE: 'RESET_STATE',
} as const;
export type MoneyReducerActionType = typeof moneyReducerActionTypes;
export type MoneyReducerActionTypesKey = MoneyReducerActionType[keyof MoneyReducerActionType];

export type MoneyReducerAction = {
  type: MoneyReducerActionTypesKey;
  payload?: any; // todo add conditional type
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ADD_TO_CURRENT_AMOUNT = MoneyReducerAction & {
  payload: number;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export type SUBTRACT_FROM_CURRENT_AMOUNT = MoneyReducerAction & {
  payload: number;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export type RESET_STATE = Omit<MoneyReducerAction, 'payload'>;
