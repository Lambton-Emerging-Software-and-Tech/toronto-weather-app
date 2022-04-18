import React from 'react';
import { shallow } from 'enzyme';
import Weather from '../../components/Weather';

test('should test Weather component', () => {
 const wrapper = shallow(<Weather />);
 expect(wrapper).toMatchSnapshot();
});