import React from 'react';
import { shallow } from 'enzyme';
import Register from '../../components/Register';

test('should test Register component', () => {
 const wrapper = shallow(<Register />);
 expect(wrapper).toMatchSnapshot();
});