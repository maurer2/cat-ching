import React, { useRef } from 'react';

import App from '../App';
import Money from '../../types/Money';
import OverlayNew from '../OverlayNew/OverlayNew';
import type { OverlayNewRefFields } from '../OverlayNew/OverlayNew.types';
import type { Coin } from '../../types/Coin';
import useCoins from '../../hooks/useCoins';
import LoadingIndicator from '../LoadingIndicator';

const url: string = import.meta.env.VITE_CLIENT_URL;
const port: string = import.meta.env.VITE_SERVER_PORT;

// type OverlayNewRefFields2 = ComponentPropsWithRef<typeof OverlayNew>['ref'];

function AppContainer() {
  const overlayNew = useRef<OverlayNewRefFields>(null);
  const coinData = useCoins(url, port);
  const coinList: ReadonlyArray<Coin> | null = (coinData.type === 'success')
    ? coinData.data.map((coin) => {
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
    })
    : null;
  return (
    <>
      {coinList !== null && <App coinList={coinList} data-testid="app" />}
      <OverlayNew
        ref={overlayNew}
        renderOverlay={(handleCloseButtonClick) => {
          if (coinData.type === 'fetching') {
            return (
              <div role="status">
                Loading
              </div>
            );
          }

          if (coinData.type === 'error') {
            const { errorDetails, triggerRefetch } = coinData;
            return (
              <>
                <h2>
                  Error
                </h2>
                <p>
                  An error has occurred, please try again.
                </p>
                {errorDetails && (
                  <pre>
                    {errorDetails}
                  </pre>
                )}
                <button
                  type="button"
                  onClick={handleCloseButtonClick}
                  disabled
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={triggerRefetch}
                >
                  Refetch
                </button>
              </>
            );
          }

          if (coinData.type === 'success') {
            return null;
          }

          return null;
        }}
      />
      {/* <LoadingIndicator /> */}
    </>
  );
}

export default AppContainer;
