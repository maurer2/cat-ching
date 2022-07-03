/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Component from './Footer';
import * as Types from './Footer.types';

import Money from '../../types/Money';

describe('AppContainer', () => {
  const propsDefault: Types.FooterProps = {
    currentAmount: Money.fromNumber(111, 'GBP'),
  };

  const setup = (props = {}) => render(<Component {...propsDefault} {...props} />);

  it('renders', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('footer')).toBeInTheDocument();
  });

  it('has child elements', () => {
    const { getByRole } = setup();

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('amount is is visible on load', () => {
    const { getByText } = setup();

    expect(getByText('Current amount:')).toBeInTheDocument();
    expect(getByText('£1.11')).toBeInTheDocument();
  });

  it('triggers amount visibility on click', async () => {
    const user = userEvent.setup();
    const { getByRole, queryByText } = setup();

    await user.click(getByRole('button'));
    expect(queryByText('Current amount:')).not.toBeInTheDocument();
    expect(queryByText('£1.11')).not.toBeInTheDocument();
  });
});
