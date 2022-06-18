import React from 'react';

import style from './Slider.module.scss';
import * as Types from './Slider.types';

function Slider({ children }: Types.SliderProps): JSX.Element {
  return (
    <ul className={style.slider}>
      {React.Children.map(children, (child) => (
        <li className={style.slide}>
          {child}
        </li>
      ))}
    </ul>
  );
}

export default Slider;
