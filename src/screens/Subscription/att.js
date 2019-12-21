import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';

import { getAttSubscription, getFilteredInsuranceContracts } from 'reducers';
import Subscription from './attComponent';

class SubscriptionComponent extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchFilteredInsuranceContracts, subId } = this.props;
    fetchFilteredInsuranceContracts({ att_subscription: subId });
  }

  render() {
    const { contracts, subscription } = this.props;

    const hasActiveContract = contracts.some(contract => contract.id && contract.att_subscription);
    return (
      <Subscription
        {...this.props}
        hasActiveContract={hasActiveContract}
        subStatus={subscription && subscription.att_status}
        sku={subscription && subscription.device_specs}
      />
    );
  }
}

const mapStateToProps = (state, { subId }) => ({
  subscription: getAttSubscription(state, subId),
  contracts: getFilteredInsuranceContracts(state, { attSubscription: subId }),
});

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionComponent);
