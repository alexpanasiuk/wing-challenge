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
  render() {
    const { sku, insurancePlan } = this.props;

    return (
      <div>
        <DeviceInfo deviceId={sku} />

        <Box className={styles.makeClaim}>
          <PlanInfo insurancePlan={insurancePlan} />
          <BottomButton href="#">Confirm</BottomButton>
        </Box>
      </div>
    );
  }
}
export default InsuranceConfirm;
