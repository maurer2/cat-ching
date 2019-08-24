import React from 'react';
import style from './Slider.module.scss';

function Slider(props) {
  return (
    <ul className={style.slider}>
      {props.children.map((child) => (
        <li className={style.slide}>{child}</li>
      ))}
    </ul>
  );
}

export default Slider;
