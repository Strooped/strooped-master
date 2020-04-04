import React from 'react';
import { render, mount } from 'enzyme';
import SelectInput from '../SelectInput';

describe('<SelectInput/>', () => {
  it('should render all options', () => {
    const wrapper = render(<SelectInput
      onChange={() => null}
      onBlur={() => null}
      label="Some label"
      name="name"
    >
      <option value="1" disabled>Disabled option</option>
      <option value="2">Some option</option>
    </SelectInput>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should notify when selection has changed', () => {
    const changeSpy = jest.fn();
    const wrapper = mount(<SelectInput
      onChange={changeSpy}
      onBlur={() => null}
      label="Some label"
      name="name"
      value="1"
    >
      <option value="1" disabled>Disabled option</option>
      <option value="2">Some option</option>
    </SelectInput>);

    const changeEvent = { target: { value: '2' } };
    wrapper.find('select').simulate('change', changeEvent);

    expect(changeSpy).toHaveBeenCalled();

    const [call] = changeSpy.mock.calls;
    expect(call[0].target.value).toBe('2');
  });
});
