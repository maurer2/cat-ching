/* eslint-disable max-len */
import { describe } from 'vitest';
import Money from '../../../types/Money';

import moneyReducers from './money.reducers';
import type { State } from './money.reducers.types';

describe.concurrent('moneyReducers', () => {
  beforeEach(() => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.999_99);
  });

  const defaultState: State = {
    targetAmount: Money.fromNumber(699, 'GBP'),
    currentAmount: Money.fromNumber(0, 'GBP'),
  };

  const notEmptyState: State = {
    targetAmount: Money.fromNumber(699, 'GBP'),
    currentAmount: Money.fromNumber(300, 'GBP'),
  };

  it('should return current state if unknown action is dispatched', () => {
    expect(moneyReducers(defaultState, { type: 'unknown test action' as unknown as any })).toEqual(
      expect.objectContaining({
        targetAmount: defaultState.targetAmount,
        currentAmount: defaultState.currentAmount,
      }),
    );
  });

  it("ADD_TO_CURRENT_AMOUNT adds payload to current amount but doesn't change target amount", () => {
    expect(
      moneyReducers(defaultState, {
        type: 'ADD_TO_CURRENT_AMOUNT',
        payload: Money.fromNumber(111, 'GBP'),
      }),
    ).toEqual(
      expect.objectContaining({
        targetAmount: defaultState.targetAmount,
        currentAmount: Money.fromNumber(111, 'GBP'),
      }),
    );
  });

  it("SUBTRACT_FROM_CURRENT_AMOUNT subtracts payload from current amount but doesn't change target amount", () => {
    expect(
      moneyReducers(notEmptyState, {
        type: 'SUBTRACT_FROM_CURRENT_AMOUNT',
        payload: Money.fromNumber(123, 'GBP'),
      }),
    ).toEqual(
      expect.objectContaining({
        targetAmount: notEmptyState.targetAmount,
        currentAmount: Money.fromNumber(177, 'GBP'),
      }),
    );
  });

  it("SUBTRACT_FROM_CURRENT_AMOUNT subtracts payload from current amount but doesn't go below zero", () => {
    expect(
      moneyReducers(notEmptyState, {
        type: 'SUBTRACT_FROM_CURRENT_AMOUNT',
        payload: Money.fromNumber(1234, 'GBP'),
      }),
    ).toEqual(
      expect.objectContaining({
        targetAmount: notEmptyState.targetAmount,
        currentAmount: Money.fromNumber(0, 'GBP'),
      }),
    );
  });

  it('RESET_STATE sets current valuer to zero and sets a random target value', () => {
    expect(
      moneyReducers(notEmptyState, {
        type: 'RESET_STATE',
      }),
    ).toEqual(
      expect.objectContaining({
        targetAmount: Money.fromNumber(1000, 'GBP'),
        currentAmount: Money.fromNumber(0, 'GBP'),
      }),
    );
  });
});
