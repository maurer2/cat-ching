import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { coinSchema, coinListSchema } from '../src/schema/coins';

const c = initContract();

export const contract = c.router({
  getCoin: {
    method: 'GET',
    path: '/coin/:value',
    pathParams: z.object({
      value: z.string().nonempty(), // todo z.coerce()
    }),
    responses: {
      200: coinSchema.nullable(),
      400: c.type<{ message: string }>(),
      404: c.type<{ message: string }>(),
    },
    summary: 'Get coin by value',
  },
  getCoins: {
    method: 'GET',
    path: '/coins',
    responses: {
      200: coinListSchema.nullable(),
      404: c.type<{ message: string }>(),
    },
    summary: 'Get all coins',
  },
});
