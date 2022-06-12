import React from 'react';
import { shallow } from 'enzyme';
import uuidv1 from 'uuid/v1';

import Coin from './Coin';
import Money from '../../data/money';

jest.mock('uuid/v1');

describe('Coin', () => {
  const mockedHandleAmountChange = jest.fn();
  const moneyData = new Money(1, 'Dollar');

  uuidv1.mockImplementation(() => 'test-id');

  const coinData = {
    name: '1 dollar',
    image: 'image name',
    amount: moneyData,
    handleAmountChange: mockedHandleAmountChange,
    key: '1 dollar',
  }

  it('should render correctly', () => {
    const wrapper = shallow(<Coin
      {...coinData}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
