import React from 'react';
import { shallow } from 'enzyme';

import InsuranceConfirm from './InsuranceConfirm';

describe('AttSubscription component', () => {
  it('should render', () => {
    shallow(<InsuranceConfirm />);
  });

  it('should render only with plan id', () => {
    shallow(<InsuranceConfirm insPlanId={6} findInsurancePlan={() => {}} />);
  });

  it('should render with plan ', () => {
    const plan = {
      conversion_fee: '74.50',
      id: 10,
      max_value: '1000.00',
      min_value: '1.00',
      name: 'Wing Extended Warranty',
      price: '1.96',
      repair_deductible: '74.50',
      replacement_deductible: '149.00',
      sku: 'WEW',
      tax_regulatory_code: '05',
      tax_transaction_code: null,
      tier: 2,
    };
    shallow(<InsuranceConfirm insurancePlan={plan} />);
  });
});
