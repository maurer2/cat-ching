import type { PropsWithChildren } from 'react';
import React from 'react';
import { render } from '@testing-library/react';

import Component from './Slider';

describe('AppContainer', () => {
  const propsDefault: PropsWithChildren = {
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
