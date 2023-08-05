import React from 'react';
import { render } from '@testing-library/react';

import Component from './App';
import * as Types from './App.types';
import Money from '../../types/Money';
import useArrayShuffle from '../../hooks/useArrayShuffle';

const mockedCoinList = [
  {
    name: '1 Pound',
    image: '1l.png',
    size: {
      height: 1,
      unit: 'mm',
      width: 1,
    },
    amount: Money.fromNumber(100, 'GBP'),
  },
  {
    name: '2 Pounds',
    image: '2l.png',
    size: {
      height: 1,
      unit: 'mm',
      width: 1,
    },
    amount: Money.fromNumber(200, 'GBP'),
  },
  {
    name: '1 Penny',
    image: '1p.png',
    size: {
      height: 1,
      unit: 'mm',
      width: 1,
    },
    amount: Money.fromNumber(1, 'GBP'),
  },
  {
    name: '2 Pence',
    image: '2p.png',
    size: {
      height: 1,
      unit: 'mm',
      width: 1,
    },
    amount: Money.fromNumber(1, 'GBP'),
  },
  {
    name: '5 Pence',
    image: '5p.png',
    size: {
      height: 1,
      unit: 'mm',
      width: 1,
    },
    amount: Money.fromNumber(1, 'GBP'),
  },
  {
    name: '10 Pence',
    image: '10p.png',
    size: {
      height: 1,
      unit: 'mm',
      width: 1,
    },
    amount: Money.fromNumber(1, 'GBP'),
  },
  {
    name: '20 Pence',
    image: '20p.png',
    size: {
      height: 1,
      unit: 'mm',
      width: 1,
    },
    amount: Money.fromNumber(1, 'GBP'),
  },
  {
    name: '50 Pence',
    image: '50p.png',
    size: {
      height: 1,
      unit: 'mm',
      width: 1,
    },
    amount: Money.fromNumber(1, 'GBP'),
  },
] as const;
vi.mock('../../hooks/useArrayShuffle', () => ({
  default: vi.fn(),
}));

describe('AppContainer', () => {
  beforeEach(() => {
    // set fixed random target value
    vi.spyOn(global.Math, 'random').mockReturnValueOnce(0.5);
    // https://github.com/vitest-dev/vitest/issues/745
    vi.mocked(useArrayShuffle).mockReturnValue([mockedCoinList, vi.fn()]);
  });

  afterEach(() => {
    vi.spyOn(global.Math, 'random').mockRestore();
  });

  const propsDefault: Types.AppProps = {
    coinList: mockedCoinList,
  };

  const setup = (props = {}) => render(<Component {...propsDefault} {...props} />);

  it('renders', () => {
    const { getByTestId } = setup();

    expect(getByTestId('app')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
