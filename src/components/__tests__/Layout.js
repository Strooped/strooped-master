import React from 'react';
import { render } from 'enzyme';

import Layout from '../Layout';

describe('<Layout/>', () => {
  it('renders with children wrapped inside', () => {
    const wrapper = render(<Layout><h1>Hello world</h1></Layout>);

    expect(wrapper).toMatchSnapshot();
  });
});
