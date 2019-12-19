import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchValue as fetchAllPlans } from 'insurance/insurancePlans/actions';

import { getAllInsurancePlan } from '../../../reducers';

const insurancePlansDecorator = DecoratedComponent => {
  class InsurancePlansDecorator extends Component {
    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
      this.props.fetchAllPlans('all');
    };

    render() {
      console.log(this.props.plans);
      const { children, fetchAllPlans, ...props } = this.props;
      return React.createElement(DecoratedComponent, props, children);
    }
  }
  const mapStateToProps = state => ({
    plans: getAllInsurancePlan(state),
  });

  const mapDispatchToProps = { fetchAllPlans };

  return connect(mapStateToProps, mapDispatchToProps)(InsurancePlansDecorator);
};

export default insurancePlansDecorator;
