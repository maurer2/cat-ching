import Money from '../../types/Money';
import { State, actionTypeValues, ActionTypeKeys, Actions } from './App.types';

export const moneyReducer = (state: State, action: Actions<ActionTypeKeys>): State => {
  switch (action.type) {
    case actionTypeValues.ADD_TO_CURRENT_AMOUNT: {
      const currentAmount: Money = state.currentAmount.add(action.payload);
      return {
        ...state,
        currentAmount,
      };
    }
    case actionTypeValues.SUBTRACT_FROM_CURRENT_AMOUNT: {
      let currentAmount: Money = state.currentAmount.subtract(action.payload);

      if (currentAmount.isNegative()) {
        currentAmount = Money.fromNumber(0, 'GBP');
      }

      return {
        ...state,
        currentAmount,
      };
    }
    case actionTypeValues.RESET_STATE: {
      // test - should break
      // console.log(action.payload)
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
