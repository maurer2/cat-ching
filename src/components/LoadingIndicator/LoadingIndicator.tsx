/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';

import style from './LoadingIndicator.module.scss';

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

  useEffect(() => {
    const keyframes = [
      // 0
      { background: 'conic-gradient(transparent 0deg 360deg' },
      // 33%
      { background: 'conic-gradient(red 0deg 120deg, transparent 120deg 360deg)' },
      // 66%
      { background: 'conic-gradient(red 0deg 120deg, green 120deg 240deg, transparent 240deg 360deg)' },
      // 100%
      { background: 'conic-gradient(red 0deg 120deg, green 120deg 240deg, blue 240deg 360deg)' },
    ];

    const keyframesOptions: KeyframeAnimationOptions = {
      duration: 1000,
      iterations: 1,
      fill: 'forwards',
    };

    const numberOfFinishedRequests = requests.filter(Boolean).length;
    console.log(numberOfFinishedRequests);

    circleElement?.current?.animate(keyframes, keyframesOptions);
  }, [requests]);

  return (
    <figure data-testid="LoadingIndicator" className={style.container}>
      <div className={style.circle} ref={circleElement} />
      <figcaption>
        <pre>{JSON.stringify(requests)}</pre>
      </figcaption>
    </figure>
  );
}

export default LoadingIndicator;
