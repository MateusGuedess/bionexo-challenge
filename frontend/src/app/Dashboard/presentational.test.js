import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Dashboard, BoardPanelList, BoardPanelListItem } from './presentational';


Enzyme.configure({ 'adapter': new Adapter() })
describe('<Dashboard />', () => 
{
    describe('<Panel />', () => 
    {
        describe('<PanelList />', () => 
        {
            it('Should render loading message if fetching', () => 
            {
                const wrapper = shallow(<BoardPanelList googlemaps={{ 'isFetching': true }} />);
                expect(wrapper.find('ul').find('li').contains(<i className="fa fa-spinner fa-spin" />)).to.be.true;
            });

            it('Should render message if no results', () => 
            {
                const wrapper = shallow(<BoardPanelList googlemaps={{ 'data': { 'total': 0 } }} />);
                expect(wrapper.find('ul').text()).to.be.equal('No results found');
            });

            it('Should render list', () => 
            {
                const mockList = [
                    { 'id': 1, 'name': 'UBS Itaim Bibi', 'address': 'Itaim Bibi', 'city': 'São Paulo', 'phone': '11 5524-7842' }
                ]
                const wrapper = shallow(<BoardPanelList googlemaps={{ 
                    'data': { 'total': mockList.length, 'results': mockList } 
                }} />);
                expect(wrapper.find('ul').childAt(0)).to.have.length(1);
            });
        });
    });
});