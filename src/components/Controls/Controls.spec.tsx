import React from 'react';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import Component from './Controls';
// import * as Types from './Controls.types';

describe('AppContainer', () => {
  // const propsDefault: Types.ControlsProps = {};

  const setup = (props = {}) => render(<Component
    {...props}
    onAddAmount={() => {}}
    onSubtractAmount={() => {}}
  />);

  it('renders', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('controls')).toBeInTheDocument();
  });
});
