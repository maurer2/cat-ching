/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import style from './LoadingIndicator.module.scss';

const amounts = [1, 10, 100];

function getRandomTime() {
  return (Math.floor(Math.random() * 5) + 1) * 1000;
}

function LoadingIndicator(): JSX.Element {
  const [requests, setRequests] = useState<[boolean, boolean, boolean]>([false, false, false]);

  useEffect(() => {
    const timeout1 = window.setTimeout(
      () => setRequests(([_, ...rest]) => [true, ...rest]),
      getRandomTime(),
    );
    const timeout10 = window.setTimeout(
      () => setRequests(([first, _, last]) => [first, true, last]),
      getRandomTime(),
    );
    const timeout100 = window.setTimeout(
      () => setRequests(([first, second]) => [first, second, true]),
      getRandomTime(),
    );

    return () => {
      window.clearTimeout(timeout1);
      window.clearTimeout(timeout10);
      window.clearTimeout(timeout100);
    };
  }, []);

  return (
    <figure data-testid="LoadingIndicator">
      <div className={style.circle} />
      <pre>{JSON.stringify(requests)}</pre>
    </figure>
  );
}

export default LoadingIndicator;
