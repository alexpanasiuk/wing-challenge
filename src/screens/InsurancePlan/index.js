import React from 'react';
import Back from 'common/Back';
import * as routes from 'app/routes';
import insurancePlansDecorator from 'insurance/insurancePlans/SelectPlans/decorator';
import PlanCard from '../../insurance/insurancePlans/PlanCard';
import styles from './InsurancePlan.module.css';

const SprintInsurancePlan = props => {
  const { subId } = props;
  return (
    <div>
      <div className={styles.Back}>
        <Back to={routes.sprintSubscription(subId)} />
      </div>
      <h1>Your Device Protection Details</h1>
      <div className={styles.CardsWrapper}>
        <PlanCard />
        <PlanCard isScale={true} />
        <PlanCard />
      </div>
    </div>
  );
};

export default insurancePlansDecorator(SprintInsurancePlan);
