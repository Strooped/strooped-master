import React from 'react';
import { mount } from 'enzyme';
import Input from '../Input';


describe('<Input/>', () => {
  it('should notify when selection has changed', () => {
    const changeSpy = jest.fn();
    const wrapper = mount(<Input
      onChange={changeSpy}
      onBlur={() => null}
      label="Some label"
      name="name"
      value=""
      type="text"
    />);

    const changeEvent = { target: { value: 'Hello world' } };
    wrapper.find('input').simulate('change', changeEvent);

    expect(changeSpy).toHaveBeenCalled();

    const [call] = changeSpy.mock.calls;
    expect(call[0].target.value).toBe('Hello world');
  });

  it('should reflect type in html-input', () => {
    const wrapper = mount(<Input
      onChange={() => null}
      onBlur={() => null}
      label="Some label"
      name="name"
      value=""
      type="email"
    />);

    const nativeInput = wrapper.find('input');

    expect(nativeInput.props().type).toBe('email');
  });
});
