import React from 'react';
import { render } from '@testing-library/react';

import Component from './Slider';
import * as Types from './Slider.types';

describe('AppContainer', () => {
  const propsDefault: Types.SliderProps = {
    children: <div>Children</div>,
  };

  const setup = (props = {}) => render(<Component {...propsDefault} {...props} />);

  it('renders', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('slider')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('has child elements', () => {
    const { getByText } = setup();

    expect(getByText('Children')).toBeInTheDocument();
  });
});
