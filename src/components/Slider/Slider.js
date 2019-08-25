import React from 'react';
import style from './Slider.module.scss';

const Entry = (props) => {
  return (
    <li className={style.slide}>
      {props.children}
    </li>
  );
}

const Container = (props) => {
  return (
    <ul className={style.slider}>
      {props.children}
    </ul>
  );
}

function Slider(props) {
  return (
    <Container>
      {props.children.map((child, index) => (
        <Entry key={index}>
          {child}
        </Entry>
      ))}
    </Container>
  );
}

export default Slider;
