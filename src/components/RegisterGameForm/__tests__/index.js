import React from 'react';
import { render } from 'enzyme';
import RegisterGameForm from '../index';

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
});
