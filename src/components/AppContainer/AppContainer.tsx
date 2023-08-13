import React, { useRef } from 'react';
import { initQueryClient } from '@ts-rest/react-query';

import { contract } from '../../../server/contract';
import App from '../App';
import Money from '../../types/Money';
import OverlayNew from '../OverlayNew/OverlayNew';
import type { OverlayNewRefFields } from '../OverlayNew/OverlayNew.types';
import type { Coin } from '../../types/Coin';
import useCoins from '../../hooks/useCoins';

const url: string = import.meta.env.VITE_CLIENT_URL;
const port: string = import.meta.env.VITE_SERVER_PORT;
const client = initQueryClient(contract, {
  baseUrl: `http://localhost:${port}`,
  baseHeaders: {},
});

// type OverlayNewRefFields2 = ComponentPropsWithRef<typeof OverlayNew>['ref'];

function AppContainer() {
  const overlayNew = useRef<OverlayNewRefFields>(null);
  const {
    data, isFetching, error, refetch, isSuccess, isError,
  } = client.getCoins.useQuery(
    ['coins'],
    {},
    { staleTime: Number.POSITIVE_INFINITY },
  );

  const coinData = useCoins(url, port);

  let coinList: ReadonlyArray<Coin> | null = null;
  if (coinData.type === 'success') {
    coinList = coinData.data.map((coin) => {
      const {
        name,
        image,
        size,
        value,
      } = coin;

      return {
        name,
        image,
        size,
        amount: Money.fromNumber(value, 'GBP'),
      };
    });
  }

  return (
    <>
      {coinList !== null && <App coinList={coinList} data-testid="app" />}
      {/* todo: move into a new component */}
      <OverlayNew
        ref={overlayNew}
        renderOverlay={(handleCloseButtonClick) => {
          if (isFetching) {
            return (
              <div role="status">
                Loading
              </div>
            );
          }

          if (isError) {
            return (
              <>
                <h2>
                  Error
                </h2>
                <p>
                  An error has occurred, please try again.
                </p>
                <pre>
                  {error.status}
                </pre>
                <button
                  type="button"
                  onClick={handleCloseButtonClick}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => refetch()}
                >
                  Refetch
                </button>
              </>
            );
          }

          if (isSuccess) {
            return null;
          }

          return null;
        }}
      />
    </>
  );
}

export default AppContainer;
