import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../../components/Nav';

test('should test Nav component', () => {
 const wrapper = shallow(<Nav />);
 expect(wrapper).toMatchSnapshot();
});