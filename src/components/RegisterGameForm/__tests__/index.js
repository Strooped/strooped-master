import React from 'react';
import { render, mount } from 'enzyme';
import { updateFormField, wait } from '../../../../test/util';
import RegisterGameForm from '../index';

jest.mock('../../../utils/api/gameRoomApi');

describe('<RegisterGameForm/>', () => {
  // Used to silence annoying useLayoutEffect complaint from React
  jest.spyOn(console, 'error').mockImplementation();

  it('should render with game modes provided', () => {
    const wrapper = render(<RegisterGameForm
      modes={[
        {
          id: 1,
          title: 'Mode 1',
        },
        {
          id: 2,
          title: 'Mode 2',
        },
      ]}
      onRegistered={() => null}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should pass all required fields to API when creating room', async () => {
    const onRegisteredSpy = jest.fn();
    const wrapper = mount(<RegisterGameForm
      modes={[
        {
          id: 1,
          title: 'Mode 1',
        },
        {
          id: 2,
          title: 'Mode 2',
        },
      ]}
      onRegistered={onRegisteredSpy}
    />);

    updateFormField(wrapper.find('input[name="name"]'), { name: 'name', value: 'Some game' });
    updateFormField(wrapper.find('input[name="name"]'), { name: 'mode', value: '2' });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    // Form submittion includes async actions
    await wait(1);

    expect(onRegisteredSpy).toHaveBeenCalled();
  });
});
