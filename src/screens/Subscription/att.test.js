import React from 'react';
import { shallow } from 'enzyme';

import AttSubscription from './attComponent';

describe('AttSubscription component', () => {
  it('should render', () => {
    expect(shallow(<AttSubscription subId={360} />)).toHaveLength(1);
  });
});
