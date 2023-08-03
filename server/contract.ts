import { initContract } from '@ts-rest/core';
import { coinSchema, coinListSchema } from '../src/schema/coins';

const c = initContract();

export const contract = c.router({
  getCoin: {
    method: 'GET',
    path: '/coin/:value',
    responses: {
      200: coinSchema.nullable(),
    },
    summary: 'Get coin by value',
  },
  getCoins: {
    method: 'GET',
    path: '/coins/',
    responses: {
      200: coinListSchema.nullable(),
    },
    summary: 'Get all coins',
  },
});
