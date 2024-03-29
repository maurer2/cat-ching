import type { WheelEvent, PropsWithChildren } from 'react';
import React, { useRef, Children } from 'react';

import style from './Slider.module.scss';
// import type * as Types from './Slider.types';

function Slider({ children }: PropsWithChildren): JSX.Element {
  const scrollWrapperElement = useRef<HTMLUListElement | null>(null);

  function handleSegmentScrolling(event: WheelEvent<HTMLUListElement>) {
    const { deltaY, currentTarget } = event;
    const slideWidthBB = currentTarget.getBoundingClientRect();
    const startScrollPosition = scrollWrapperElement.current?.scrollLeft ?? 0;

    // scroll right
    if (Math.sign(deltaY) === 1) {
      scrollWrapperElement.current?.scrollTo({
        left: startScrollPosition + slideWidthBB.width / 2,
        behavior: 'smooth',
      });
    }

    // scroll left
    if (Math.sign(deltaY) === -1) {
      scrollWrapperElement.current?.scrollTo({
        left: startScrollPosition - slideWidthBB.width / 2,
        behavior: 'smooth',
      });
    }
  }

  return (
    <ul
      className={style.slider}
      ref={scrollWrapperElement}
      onWheel={handleSegmentScrolling}
      data-testid="slider"
    >
      {Children.map(children, (child) => (
        <li className={style.slide}>{child}</li>
      ))}
    </ul>
  );
}

export default Slider;
