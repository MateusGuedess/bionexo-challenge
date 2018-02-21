import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Body, Header, Content } from './presentational';


Enzyme.configure({ 'adapter': new Adapter() })
describe('<Layout />', () => 
{
    it('Should render Layout', () => 
    {
        const wrapper = shallow(<Body />);
        expect(wrapper.find('.app')).to.have.length(1);
    });

    it('Should render header', () => 
    {
        const wrapper = shallow(<Body />);
        expect(wrapper.contains(<Header />)).to.be.true;
    });

    it('Should render body', () => 
    {
        const wrapper = shallow(<Body />);
        expect(wrapper.contains(<Content />)).to.be.true;
    });
});