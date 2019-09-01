import React from 'react';
import { shallow } from 'enzyme';

import Footer from './Footer';
import Money from '../../data/money';

describe('Footer', () => {
  const moneyData = new Money(1, 'Dollar');

  it('should render correctly', () => {
    const wrapper = shallow(<Footer
      currentAmount={moneyData}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
