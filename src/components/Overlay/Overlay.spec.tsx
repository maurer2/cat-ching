/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Component from './Overlay';
import * as Types from './Overlay.types';

describe('AppContainer', () => {
  const onReset = vi.fn();

  const propsDefault: Types.OverlayProps = {
    onReset,
  };

  const setup = (props = {}) => render(<Component {...propsDefault} {...props} />);

  it('renders', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('overlay')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('has child elements', () => {
    const { getByRole, getByText } = setup();

    expect(getByText('Purrfect!')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('triggers reset callback on click', async () => {
    const user = userEvent.setup();
    const { getByText } = setup();

    await user.click(getByText('Reset'));
    expect(onReset).toHaveBeenCalled();
  });
});
