import React from 'react';
import { shallow } from 'enzyme';

import Overlay from './Overlay';

describe('Overlay', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Overlay/>);

    expect(wrapper).toMatchSnapshot();
  });
});
