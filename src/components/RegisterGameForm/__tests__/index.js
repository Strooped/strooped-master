import React from 'react';
import { render, mount } from 'enzyme';
import { submitForm } from '../../../../test/util';
import RegisterGameForm from '../index';

jest.mock('../../../utils/api/gameRoomApi');

describe('<RegisterGameForm/>', () => {
  it('should render with game modes provided', () => {
    // Used to silence annoying useLayoutEffect complaint from React
    jest.spyOn(console, 'error').mockImplementation();

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

    wrapper.find('button').first().simulate('click');

    await submitForm(wrapper.find('form'));

    expect(onRegisteredSpy).toHaveBeenCalled();
  });
});
