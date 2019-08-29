import React from 'react';
import PropTypes from 'prop-types';

import style from './Slider.module.scss';

const Entry = ({ children }) => (
  <li className={style.slide}>
    {children}
  </li>
);

const Container = ({ children }) => (
  <ul className={style.slider}>
    {children}
  </ul>
);

function Slider({ children }) {
  return (
    <Container>
      {React.Children.map(children, child => (
        <Entry key={child.props.name}>
          {child}
        </Entry>
      ))}
    </Container>
  );
}

export default Slider;

Slider.propTypes = {
  children: PropTypes.node.isRequired,
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

Entry.propTypes = {
  children: PropTypes.node.isRequired,
};
