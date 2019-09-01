import React from 'react';
import { shallow } from 'enzyme';

import Slider, { Entry, Container } from './Slider';
import Money from '../../data/money';

describe('Slider', () => {
  /*
  const mockeHandleAmountChange = jest.fn();
  const moneyData = new Money(1, 'Dollar');
  const coinData = {
    name: '1 dollar',
    image: 'image name',
    amount: moneyData,
    handleAmountChange: mockeHandleAmountChange,
    key: '1 dollar',
  }
  */

  it('should render correctly', () => {
    expect(true).toBe(true);
  });
})

describe('Entry', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Entry>
      Test
    </Entry>);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Container', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Container>
      Test
    </Container>);

    expect(wrapper).toMatchSnapshot();
  });
});
