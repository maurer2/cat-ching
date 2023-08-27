/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import style from './LoadingIndicator.module.scss';
import coinImage from '../../assets/images/50p-ciiir.png';

const amounts = [1, 10, 100];

function getRandomTime() {
  return (Math.floor(Math.random() * 5) + 1) * 1000;
}

function LoadingIndicator(): JSX.Element {
  const [requests, setRequests] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const circleElement = useRef<HTMLDivElement>(null);

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

  const numberOfFinishedRequests = requests.filter(Boolean).length;

  return (
    <figure data-testid="LoadingIndicator" className={style.container}>
      <div className={clsx(style.imageOverlayContainer, {
        [style.imageOverlayContainerOneThird]: numberOfFinishedRequests === 1,
        [style.imageOverlayContainerTwoThird]: numberOfFinishedRequests === 2,
        [style.imageOverlayContainerThreeThird]: numberOfFinishedRequests === 3,
      })}
      >
        <img src={coinImage} alt="" className={style.image} />
      </div>
      <div ref={circleElement} />
      <figcaption>
        <pre>{JSON.stringify(requests)}</pre>
      </figcaption>
    </figure>
  );
}

export default LoadingIndicator;
