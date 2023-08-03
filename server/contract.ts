import { initContract } from '@ts-rest/core';
import { coinSchema } from '../src/schema/coins';

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
});
