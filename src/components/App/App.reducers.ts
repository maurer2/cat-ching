import Money from '../../types/Money';
import { MoneyReducerState, MoneyReducerAction } from './App.types';

export const moneyReducer = (state: MoneyReducerState, { type, payload }: MoneyReducerAction) => {
  switch (type) {
    case 'ADD_TO_CURRENT_AMOUNT': {
      const currentAmount: Money = state.currentAmount.add(payload);
      return {
        ...state,
        currentAmount,
      };
    }
    case 'SUBTRACT_FROM_CURRENT_AMOUNT': {
      let currentAmount: Money = state.currentAmount.subtract(payload);

      if (currentAmount.isNegative()) {
        currentAmount = Money.fromNumber(0, 'GBP');
      }

      return {
        ...state,
        currentAmount,
      };
    }
    case 'RESET_STATE': {
      return {
        ...state,
        targetAmount: Money.fromRandom('GBP'),
        currentAmount: Money.fromNumber(0, 'GBP'),
      };
    }
    default: {
      return state;
    }
  }
};
