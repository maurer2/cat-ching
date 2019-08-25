import React from 'react';
import style from './Slider.module.scss';

function Slider(props) {
  return (
    <ul className={style.slider}>
      {props.children.map((child, index) => (
        <li className={style.slide} key={index}>
          {child}
        </li>
      ))}
    </ul>
  );
}

export default Slider;
