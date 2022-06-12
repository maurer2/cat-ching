import React from 'react';
import PropTypes from 'prop-types';

import style from './Slider.module.scss';

function Entry({ children }) {
  return (
    <li className={style.slide}>
      {children}
    </li>
  );
}

function Container({ children }) {
  return (
    <ul className={style.slider}>
      {children}
    </ul>
  );
}

function Slider({ children }) {
  return (
    <Container>
      {React.Children.map(children, (child) => (
        <Entry>
          {child}
        </Entry>
      ))}
    </Container>
  );
}

export default Slider;

export {
  Entry,
  Container,
};

const { node } = PropTypes;

Slider.propTypes = {
  children: node.isRequired,
};

Container.propTypes = {
  children: node.isRequired,
};

Entry.propTypes = {
  children: node.isRequired,
};
