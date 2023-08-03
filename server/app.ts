import express from 'express';
import cors from 'cors';
import { initServer, createExpressEndpoints } from '@ts-rest/express';
import { z } from 'zod';
import { contract } from './contract';

type Coin = z.infer<typeof contract.getCoin.responses[200]>;
type CoinList = z.infer<typeof contract.getCoins.responses[200]>;

const app = express();

app.use(express.json());
app.use(cors());

const s = initServer();

const router = s.router(contract, {
  getCoin: async ({ params: { value } }) => {
    const coin: Coin = {
      name: '1 Pound',
      value: 100,
      image: '1l.png',
      size: {
        width: 23.3,
        height: 23.43,
        unit: 'mm',
      },
    };

    return {
      status: 200,
      // eslint-disable-next-line unicorn/no-null
      body: (value === '100') ? coin : null,
    };
  },
  getCoins: async () => {
    const coins: CoinList = [
      {
        name: '1 Pound',
        value: 100,
        image: '1l.png',
        size: {
          width: 23.3,
          height: 23.43,
          unit: 'mm',
        },
      } satisfies Coin,
      {
        name: '2 Pounds',
        value: 200,
        image: '2l.png',
        size: {
          width: 28.4,
          height: 28.4,
          unit: 'mm',
        },
      } satisfies Coin,
    ];

    return {
      status: 200,
      body: coins,
    };
  },
});

createExpressEndpoints(contract, router, app);

const port = process.env.port || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
