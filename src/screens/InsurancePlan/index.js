import React from 'react';
import Back from 'common/Back';
import * as routes from 'app/routes';
import insurancePlansDecorator from 'insurance/insurancePlans/SelectPlans/decorator';
import PlanCard from '../../insurance/insurancePlans/PlanCard';
import styles from './InsurancePlan.module.css';

export const InsurancePlans = props => {
  const { subId, sku, plans, isSprint } = props;
  const sortedPlans = plans ? Object.values(plans).sort(priceComparator) : [];

  const goToConfirmPage = planId => {
    return isSprint ? routes.sprintInsuranceConfirm(subId, sku, planId) : routes.attInsuranceConfirm(subId, sku, planId);
  };

  if (!sortedPlans.length) {
    return null;
  }

  return (
    <div>
      <div className={styles.Back}>
        <Back to={isSprint ? routes.sprintSubscription(subId) : routes.attSubscription(subId)} />
      </div>
      <h1>Your Device Protection Details</h1>
      <div className={styles.CardsWrapper}>
        <PlanCard plan={sortedPlans[0]} goToConfirmPage={goToConfirmPage} />
        <PlanCard plan={sortedPlans[2]} goToConfirmPage={goToConfirmPage} isScale={true} />
        <PlanCard plan={sortedPlans[1]} goToConfirmPage={goToConfirmPage} />
      </div>
    </div>
  );
};

export const asc = (a, b) => {
  if (b > a) {
    return -1;
  }
  if (b < a) {
    return 1;
  }
  return 0;
};

export const priceComparator = (a, b) => {
  return asc(Number(a.price), Number(b.price));
};

export default insurancePlansDecorator(InsurancePlans);
