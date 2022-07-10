import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Component from './Coin';
import * as Types from './Coin.types';

import Money from '../../types/Money';

describe('AppContainer', () => {
  const onAddAmount = vi.fn();
  const onSubtractAmount = vi.fn();

  const propsDefault: Types.CoinProps = {
    coin: {
      name: '1 Pound',
      image: '1l.png',
      size: {
        height: 1,
        unit: 'mm',
        width: 1,
      },
      amount: Money.fromNumber(100, 'GBP'),
    },
    onAddAmount,
    onSubtractAmount,

  };

  const setup = (props = {}) => render(<Component {...propsDefault} {...props} />);

  it('renders', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('coin')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('has child elements', () => {
    const { getByText } = setup();

    expect(getByText('Add amount')).toBeInTheDocument();
    expect(getByText('Subtract amount')).toBeInTheDocument();
  });

  it('triggers addAmount callback on click', async () => {
    const user = userEvent.setup();
    const { getByText } = setup();

    await user.click(getByText('Add amount'));
    expect(onAddAmount).toHaveBeenCalled();
  });

  it('triggers subtractAmount callback on click', async () => {
    const user = userEvent.setup();
    const { getByText } = setup();

    await user.click(getByText('Subtract amount'));
    expect(onSubtractAmount).toHaveBeenCalled();
  });
});
