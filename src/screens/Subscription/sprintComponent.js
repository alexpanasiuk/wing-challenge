import React from 'react';
import SubscriptionSwitcher from 'subscriptions/SubscriptionSwitcher';
import * as routes from 'app/routes';
import SubscriptionLinks from 'subscriptions/SubscriptionLinks';

export const SubscriptionScreen = props => {
  const { subId } = props;
  return (
    <div className="Subscription">
      <SubscriptionSwitcher sprintSubId={subId} sprintRoute={routes.sprintSubscription} attRoute={routes.attSubscription} />
      <SubscriptionLinks {...props} isSprint={true} />
    </div>
  );
};

export default SubscriptionScreen;
