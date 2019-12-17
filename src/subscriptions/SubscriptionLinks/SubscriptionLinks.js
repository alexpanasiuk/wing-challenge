import React from 'react';
import Box from 'common/Box';
import Link from 'common/Link';
import * as routes from 'app/routes';
import add_green_circle from 'common/img/add_green_circle.svg';
import add_data from 'common/img/add_data.svg';
import styles from './SubscriptionLinks.module.css';

export const SubsriptionLinks = ({ subId, hasActiveContract, subStatus, sku, isSprint }) => {
  return (
    <div className={styles.linkList}>
      {hasActiveContract && (
        <Link className={styles.subscriptionLink} to={isSprint ? routes.sprintInsurance(subId) : routes.attInsurance(subId)}>
          <Box>
            <img src={add_green_circle} />
            Insurance
          </Box>
        </Link>
      )}
      {!hasActiveContract && subStatus && (
        <Link
          className={styles.subscriptionLink}
          to={isSprint ? routes.sprintInsurancePlan(subId, sku) : routes.attInsurancePlan(subId, sku)}
        >
          <Box>
            <img src={add_data} />
            Select plan
          </Box>
        </Link>
      )}
    </div>
  );
};

export default SubsriptionLinks;
