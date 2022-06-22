import Money from '../../types/Money';
import * as Types from './App.types';

export const moneyReducer = (state: Money, { type, payload }: Types.MoneyReducerActions) => {
  switch (type) {
    case 'ADD_AMOUNT': {
      const amount: Money = state.add(payload);
      return amount;
    }
    case 'SUBTRACT_AMOUNT': {
      const amount: Money = state.subtract(payload);

      if (amount.isNegative()) {
        return Money.fromNumber(0, 'GBP');
      }

      return amount;
    }
    case 'RESET_AMOUNT': {
      const amount: Money = Money.fromNumber(0, 'GBP');
      return amount;
    }
    case 'SET_RANDOM_AMOUNT': {
      const amount: Money = Money.fromRandom('GBP');
      return amount;
    }
    default: {
      return state;
    }
  }
};
