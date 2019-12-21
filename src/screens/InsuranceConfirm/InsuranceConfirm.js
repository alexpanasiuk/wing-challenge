import React, { Component } from 'react';
import * as routes from 'app/routes';
import Back from 'common/Back';
import BottomButton from 'forms/BottomButton/link';
import DeviceInfo from 'devices/DeviceInfo';
import Box from 'common/Box';
import PlanInfo from 'insurance/insurancePlans/PlanInfo';

import styles from './InsuranceConfirm.module.css';

class InsuranceConfirm extends Component {
  componentDidMount() {
    const { insPlanId, insurancePlan, findInsurancePlan } = this.props;
    if (!insurancePlan) {
      insPlanId && findInsurancePlan(insPlanId);
    }
  }

  handleClick = () => {
    const { subId, sku, createContract, isSprint, insurancePlan } = this.props;
    createContract({ subscription: isSprint && subId, att_subscription: !isSprint && subId, sku, planType: insurancePlan.sku });
  };

  render() {
    const { sku, insurancePlan, subId, isSprint } = this.props;

    return (
      <div>
        <div className={styles.Back}>
          <Back to={isSprint ? routes.sprintInsurancePlan(subId, sku) : routes.attInsurancePlan(subId, sku)} />
        </div>
        <DeviceInfo deviceId={sku} />

        <Box className={styles.makeClaim}>
          <PlanInfo insurancePlan={insurancePlan} />
          <BottomButton href="#" onClick={this.handleClick}>
            Confirm
          </BottomButton>
        </Box>
      </div>
    );
  }
}
export default InsuranceConfirm;
