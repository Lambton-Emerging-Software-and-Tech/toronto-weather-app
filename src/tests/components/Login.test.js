import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../components/Login';

test('should test Login component', () => {
 const wrapper = shallow(<Login />);
 expect(wrapper).toMatchSnapshot();
});