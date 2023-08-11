/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import { initQueryClient } from '@ts-rest/react-query';

import { contract } from '../../../server/contract';
import App from '../App';
import Money from '../../types/Money';
import OverlayNew from '../OverlayNew/OverlayNew';
import type { OverlayNewRefFields } from '../OverlayNew/OverlayNew.types';
import type { Coin } from '../../types/Coin';

const port = import.meta.env.VITE_SERVER_PORT;
const client = initQueryClient(contract, {
  baseUrl: `http://localhost:${port}`,
  baseHeaders: {},
});

// type OverlayNewRefFields2 = ComponentPropsWithRef<typeof OverlayNew>['ref'];

function AppContainer() {
  const overlayNew = useRef<OverlayNewRefFields>(null);
  const { data, isLoading, error } = client.getCoins.useQuery(
    ['coins'],
    {},
    { staleTime: Number.POSITIVE_INFINITY },
  );

  // eslint-disable-next-line unicorn/no-null
  let coinList: ReadonlyArray<Coin> | null = null;
  if (data?.status && data?.body !== null) {
    coinList = data.body.map((coin) => {
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

  // test
  useEffect(() => {
    let timeout = -1;

    if (!isLoading) {
      overlayNew.current?.showOverlay();

      timeout = window.setTimeout(() => {
        overlayNew.current?.hideOverlay();
      }, 3000);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [overlayNew, isLoading]);

  return (
    <>
      {coinList !== null && <App coinList={coinList} data-testid="app" />}
      <OverlayNew
        ref={overlayNew}
        renderOverlay={(handleOverlayClick) => {
          if (error) {
            return (
              <>
                <h2>
                  Error.
                </h2>
                <p>
                  An error has occurred, please try again.
                </p>
                <button type="button" onClick={handleOverlayClick}>Click</button>
              </>
            );
          }
          if (isLoading) {
            return (
              <div role="status">
                Loading.
              </div>
            );
          }
          return (
            <div role="status">
              Has loaded.
            </div>
          );
        }}
      />
    </>
  );
}

export default AppContainer;
