import React from 'react';
import { shallow } from 'enzyme';

import { InsurancePlans, asc, priceComparator } from './index';

describe('Insurance plan component', () => {
  it('should render without plans', () => {
    shallow(<InsurancePlans />);
  });

  it('should render with plan partial data', () => {
    shallow(<InsurancePlans plans={{ id: 2 }} />);
  });

  it('test asc function', () => {
    expect(asc(10, 2)).toEqual(1);
    expect(asc(7, 21)).toEqual(-1);
    expect(asc(2, 2)).toEqual(0);
  });

  it('test price comparator', () => {
    const prices = [{ price: 15 }, { price: 23 }, { price: 2.3 }, { price: 16 }];
    expect(prices.sort(priceComparator)).toEqual([{ price: 2.3 }, { price: 15 }, { price: 16 }, { price: 23 }]);
  });
});
