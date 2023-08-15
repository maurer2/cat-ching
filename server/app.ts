import express from 'express';
import cors from 'cors';
import { initServer, createExpressEndpoints } from '@ts-rest/express';
import 'dotenv/config';

import { contract } from './contract';
import type { CoinData } from '../src/types/Coin';
import coins from '../src/data/coins';

const port = process.env.VITE_SERVER_PORT;
const isDevelopment = process.env.NODE_ENV === 'development';
const app = express();

app.use(express.json());
app.use(cors());
app.use((request, response, next) => {
  setTimeout(() => next(), isDevelopment ? 2000 : 0);
});

const server = initServer();

const router = server.router(contract, {
  getCoin: async ({ params: { value } }) => {
    // todo filtering
    const coin = coins[0] satisfies CoinData;

    // should not be possible -> handled by pathParams
    if (value.length === 0) {
      return {
        status: 400,
        body: {
          message: 'Incorrect value parameter',
        },
      };
    }

    if (value === '100') {
      return {
        status: 200,
        body: coin,
      };
    }

    return {
      status: 404,
      body: {
        message: 'Coin not found',
      },
    };
  },
  getCoins: async () => {
    const coinList = [...coins satisfies readonly CoinData[]];

    /// if (coinList.length === 0) {
    if (coinList.length > 0) {
      return {
        status: 200,
        body: coinList,
      };
    }

    return {
      status: 404,
      body: {
        message: 'Coins not found',
      },
    };
  },
});

createExpressEndpoints(contract, router, app);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
