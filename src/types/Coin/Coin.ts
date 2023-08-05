import type { z } from 'zod';

import type { coinSchema } from '../../schema/coins';
import type Money from '../Money';

// type WithCoinData<T extends object> = T & {
//   name: string,
//   image: string,
//   amount: Money,
//   size: {
//     width: number,
//     height: number,
//     unit: 'mm' | 'cm',
//   },
// };
// type Coin = WithCoinData<{ amount: Money, }>;

export type CoinData = z.infer<typeof coinSchema>;
// without value
export type Coin = Omit<CoinData, 'value'> & { amount: Money, };
