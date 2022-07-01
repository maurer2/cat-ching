import Money from '../../types/Money';
import Coin from '../../types/Coin';

export type AppProps = {
  coinList: ReadonlyArray<Coin>;
};

export type CoinsWithStableKeys = ReadonlyArray<{
  key: string;
  coin: Coin;
}>;

// taken and adapted for union types from
// https://www.newline.co/@bespoyasov/how-to-use-usereducer-with-typescript--3918a332
export type State = {
  targetAmount: Money;
  currentAmount: Money;
};

export const actionTypeValues = {
  ADD_TO_CURRENT_AMOUNT: 'ADD_TO_CURRENT_AMOUNT',
  SUBTRACT_FROM_CURRENT_AMOUNT: 'SUBTRACT_FROM_CURRENT_AMOUNT',
  RESET_STATE: 'RESET_STATE',
} as const;
export type ActionType = typeof actionTypeValues;
export type ActionTypeKeys = ActionType[keyof ActionType];

// lookup for payload types only
type ActionPayloads = {
  [actionTypeValues.ADD_TO_CURRENT_AMOUNT]: Money;
  [actionTypeValues.SUBTRACT_FROM_CURRENT_AMOUNT]: Money;
  [actionTypeValues.RESET_STATE]: never;
};

type ActionsWithoutPayload = Extract<ActionTypeKeys, 'RESET_STATE'>;
type ActionWithoutPayload = {
  type: ActionsWithoutPayload;
};

type ActionWithPayload<T extends ActionTypeKeys> = {
  // needs to also contain ActionsWithoutPayload
  type: T;
  payload: ActionPayloads[T];
};

export type Actions<T extends ActionTypeKeys> = T extends ActionsWithoutPayload
  ? ActionWithoutPayload
  : ActionWithPayload<T>;
