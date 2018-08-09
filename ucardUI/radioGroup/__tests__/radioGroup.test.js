import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import Radio from '../Radio';
import RadioGroup from '../RadioGroup';

const setup = () =>{
    const props = {
        className:'radio-group',
        value:"male",
        onChange:jest.fn(),
    };
    const wrapper = shallow(
        <RadioGroup
            {...props}
        >
            <Radio 
                value = "male" 
                labelInfo = "male" 
            />
            <Radio 
                value = "female" 
                labelInfo = "female" 
            />
        </RadioGroup>
    );
    return{
        props,
        wrapper,
    }
}

describe('<RadioGroup />', () => {
    const { props, wrapper } = setup();  
    test('should render two <Radio /> components', function(){  
        expect(wrapper.find('Radio').length).toEqual(2);
    });

    test('simulates click events', () =>{
        wrapper.find('Radio').map(function(node){
            expect(node.props().defaultValue).toEqual('male');
        });       
    });
});

