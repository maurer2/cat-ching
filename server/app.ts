import express from 'express';
import cors from 'cors';
import { initServer, createExpressEndpoints } from '@ts-rest/express';
import 'dotenv/config';

import { contract } from './contract';
import type { CoinData } from '../src/types/Coin';
import coins from '../src/data/coins';

const port = process.env.VITE_SERVER_PORT;
const app = express();

app.use(express.json());
app.use(cors());

const server = initServer();

const router = server.router(contract, {
  getCoin: async ({ params: { value } }) => {
    // todo filtering
    const coin = coins[0] satisfies CoinData;

    return {
      status: 200,
      // eslint-disable-next-line unicorn/no-null
      body: (value === '100') ? coin : null,
    };
  },
  getCoins: async () => {
    const coinList = coins satisfies readonly CoinData[];
    return {
      status: 200,
      body: [...coinList],
    };
  },
});

createExpressEndpoints(contract, router, app);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
