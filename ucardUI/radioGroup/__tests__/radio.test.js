import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import Radio from '../Radio';

const setup = () => {
    const props = {
        defaultValue:'1',
        value:'1',
        checked:true,
        onChange:jest.fn(),
    };
    const wrapper = shallow( <Radio { ...props} />);
    return {
        props,
        wrapper,
    }
}

describe('<Radio />', () => {
    test('click Compoent Radio should call onChange', () => {
        const { props, wrapper } = setup();
        const mockEventObj = {
            target:{
                value:'1',
            }
        };
        wrapper.find('input').simulate('change', mockEventObj);
        expect(props.onChange).toBeCalled();
        expect(wrapper.find('input').prop('checked')).toEqual(true);
    });
});
