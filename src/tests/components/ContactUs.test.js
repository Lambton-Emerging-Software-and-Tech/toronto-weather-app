import React from 'react';
import { shallow } from 'enzyme';
import ContactUs from '../../components/ContactUs';

test('should test ContactUs component', () => {
 const wrapper = shallow(<ContactUs />);
 expect(wrapper).toMatchSnapshot();
});