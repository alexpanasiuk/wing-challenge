import React from 'react';
import SubscriptionSwitcher from 'subscriptions/SubscriptionSwitcher';
import SubscriptionLinks from 'subscriptions/SubscriptionLinks';
import * as routes from 'app/routes';

export const SubscriptionScreen = props => {
  const { subId } = props;
  return (
    <div className="Subscription">
      <SubscriptionSwitcher attSubId={subId} attRoute={routes.attSubscription} sprintRoute={routes.sprintSubscription} />
      <SubscriptionLinks {...props} isSprint={false} />
    </div>
  );
};

export default SubscriptionScreen;
