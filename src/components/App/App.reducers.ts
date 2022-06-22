import Money from '../../types/Money';
import * as Types from './App.types';

export const moneyReducer = (state: Money, { type, payload }: Types.ReducerAction) => {
  switch (type) {
    case 'ADD_AMOUNT': {
      const newCurrentAmount: Money = state.add(payload);
      // debugger;
      return newCurrentAmount;
    }
    case 'SUBTRACT_AMOUNT': {
      const newCurrentAmount: Money = state.subtract(payload);

      if (newCurrentAmount.isNegative()) {
        return Money.fromNumber(0, 'GBP');
      }

      return newCurrentAmount;
    }
    case 'RESET_AMOUNT': {
      const newCurrentAmount: Money = Money.fromNumber(0, 'GBP');
      return newCurrentAmount;
    }
    default: {
      return state;
    }
  }
};
