import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';
import Money from '../../data/money';

describe('Header', () => {
  const moneyData = new Money(1, 'Dollar');

  const mockedHandleReset = jest.fn();

  it('should render correctly', () => {
    const wrapper = shallow(<Header
      targetAmount={moneyData}
      handleReset={mockedHandleReset}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
