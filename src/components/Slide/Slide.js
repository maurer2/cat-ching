import React from 'react';
import style from './Slide.module.scss';

function Slide(props) {
  return (
    <div className={style.slide}>
      {props.children}
    </div>
  );
}

export default Slide;
