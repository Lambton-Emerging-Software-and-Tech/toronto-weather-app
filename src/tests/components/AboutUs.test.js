import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from '../../components/AboutUs';

test('should test AboutUs component', () => {
 const wrapper = shallow(<AboutUs />);
 expect(wrapper).toMatchSnapshot();
});