import React from 'react';
import { shallow } from 'enzyme';

import SprintSubscription from './sprintComponent';

describe('SprintSubscription component', () => {
  it('should render', () => {
    expect(shallow(<SprintSubscription subId={360} />)).toHaveLength(1);
  });
});
