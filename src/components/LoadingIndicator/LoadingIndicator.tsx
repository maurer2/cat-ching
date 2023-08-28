/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CSSProperties } from 'react';
import React, { useEffect, useState, useRef } from 'react';

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
  const backgroundSections = requests.map((_, index, currentArray) => {
    const isAnInbetweenSection = (index !== 0) && (index !== currentArray.length - 1);
    const lengthOfSection = 360 / currentArray.length;

    // section borders
    // if (isAnInbetweenSection) {
    //   return `black ${lengthOfSection * index}deg ${lengthOfSection * index}deg`;
    // }

    if (index < numberOfFinishedRequests) {
      return `transparent ${lengthOfSection * index}deg ${lengthOfSection + (lengthOfSection * index)}deg`;
    }
    return `white ${lengthOfSection * index}deg ${lengthOfSection + (lengthOfSection * index)}deg`;
  });

  const conicalGradient: CSSProperties = {
    background: `conic-gradient(${backgroundSections.join(', ')})`,
  };

  return (
    <figure data-testid="LoadingIndicator" className={style.container}>
      <div className={style.imageOverlayContainer} style={conicalGradient}>
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
