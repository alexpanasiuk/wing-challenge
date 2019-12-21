import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFiltered as fetchFilteredInsuranceContracts } from 'insurance/insuranceContracts/actions';

import { getSprintSubscription, getFilteredInsuranceContracts } from 'reducers';
import Subscription from './sprintComponent';

class SubscriptionComponent extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchFilteredInsuranceContracts, subId } = this.props;
    fetchFilteredInsuranceContracts({ subscription: subId });
  }

  render() {
    const { contracts, subscription } = this.props;

    const hasActiveContract = contracts.some(contract => contract.id && contract.subscription);
    return (
      <Subscription
        {...this.props}
        hasActiveContract={hasActiveContract}
        subStatus={subscription && subscription.sprint_status}
        sku={subscription && subscription.device_specs}
      />
    );
  }
}

const mapStateToProps = (state, { subId }) => ({
  subscription: getSprintSubscription(state, subId),
  contracts: getFilteredInsuranceContracts(state, { subscription: subId }),
});

const mapDispatchToProps = {
  fetchFilteredInsuranceContracts,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionComponent);
