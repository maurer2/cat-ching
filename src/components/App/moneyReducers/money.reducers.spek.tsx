/* eslint-disable max-len */
import test from 'node:test';
import assert from 'node:assert/strict';

import Money from '../../../types/Money';

import moneyReducers from './money.reducers';
import type { State } from './money.reducers.types';

test('moneyReducers', () => {
  const defaultState: State = {
    targetAmount: Money.fromNumber(699, 'GBP'),
    currentAmount: Money.fromNumber(0, 'GBP'),
  };

  const notEmptyState: State = {
    targetAmount: Money.fromNumber(699, 'GBP'),
    currentAmount: Money.fromNumber(300, 'GBP'),
  };

  test('should return current state if unknown action is dispatched', () => {
    const newState: State = moneyReducers(defaultState, { type: 'unknown test action' as unknown as any });

    // assert.equal(newState, structuredClone(defaultState));
    assert.deepEqual(newState.targetAmount, defaultState.targetAmount);
    assert.deepEqual(newState.currentAmount, defaultState.currentAmount);
  });

  test("ADD_TO_CURRENT_AMOUNT adds payload to current amount but doesn't change target amount", () => {
    const newState: State = moneyReducers(defaultState, {
      type: 'ADD_TO_CURRENT_AMOUNT',
      payload: Money.fromNumber(111, 'GBP'),
    });

    assert.deepEqual(newState.targetAmount, defaultState.targetAmount);
    assert.deepEqual(newState.currentAmount, Money.fromNumber(111, 'GBP'));
  });

  test("ADD_TO_CURRENT_AMOUNT adds payload to current amount but doesn't change target amount", () => {
    const newState: State = moneyReducers(defaultState, {
      type: 'ADD_TO_CURRENT_AMOUNT',
      payload: Money.fromNumber(111, 'GBP'),
    });

    assert.deepEqual(newState.targetAmount, defaultState.targetAmount);
    assert.deepEqual(newState.currentAmount, Money.fromNumber(111, 'GBP'));
  });

  test("SUBTRACT_FROM_CURRENT_AMOUNT subtracts payload from current amount but doesn't change target amount", () => {
    const newState: State = moneyReducers(notEmptyState, {
      type: 'SUBTRACT_FROM_CURRENT_AMOUNT',
      payload: Money.fromNumber(123, 'GBP'),
    });

    assert.deepEqual(newState.targetAmount, notEmptyState.targetAmount);
    assert.deepEqual(newState.currentAmount, Money.fromNumber(177, 'GBP'));
  });

  test("SUBTRACT_FROM_CURRENT_AMOUNT subtracts payload from current amount but doesn't go below zero", () => {
    const newState: State = moneyReducers(notEmptyState, {
      type: 'SUBTRACT_FROM_CURRENT_AMOUNT',
      payload: Money.fromNumber(1234, 'GBP'),
    });

    assert.deepEqual(newState.targetAmount, notEmptyState.targetAmount);
    assert.deepEqual(newState.currentAmount, Money.fromNumber(0, 'GBP'));
  });
});
