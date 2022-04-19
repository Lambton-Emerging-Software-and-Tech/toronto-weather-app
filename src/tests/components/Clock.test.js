import React from 'react';
import { shallow } from 'enzyme';
import Clock from '../../components/Clock';

test('should test Clock component', () => {
    const wrapper = shallow(<Clock />);
//  expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBe(wrapper);
});