/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import Component from './Header';
import * as Types from './Header.types';

import Money from '../../types/Money';

describe('AppContainer', () => {
  const onReset = vi.fn();

  const propsDefault: Types.HeaderProps = {
    targetAmount: Money.fromNumber(111, 'GBP'),
    onReset,
  };

  const setup = (props = {}) => render(<Component {...propsDefault} {...props} />);

  it('renders', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('header')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('has child elements', () => {
    const { getByRole } = setup();

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('amount is is visible on load', () => {
    const { getByText } = setup();

    expect(getByText('Target amount:')).toBeInTheDocument();
    expect(getByText('£1.11')).toBeInTheDocument();
  });

  it('triggers reset callback on click', async () => {
    const user = userEvent.setup();
    const { getByText } = setup();

    await user.click(getByText('Reset'));
    expect(onReset).toHaveBeenCalled();
  });
});
