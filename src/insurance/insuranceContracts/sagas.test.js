import { call, put, all } from 'redux-saga/effects';
import * as routes from 'app/routes';

import * as actions from 'helpers/resourceSagas/actions';
import * as actionsInsuredDevice from 'insurance/insuredDevices/actions';
import * as actionsNotification from 'notifications/actions';

import * as sagas from './sagas';
import * as api from './api';
import { createContract, activateContract } from './actions';

const subId = 360;
const contract = {
  data: {
    att_subscription: null,
    created_at: '2019-10-08T23:59:37.296631Z',
    expiry_date: null,
    expiry_type: null,
    id: 52,
    preactivation: null,
    status: 'pending',
    subscription: subId,
    updated_at: '2019-10-09T00:00:10.763113Z',
    user_profile: 182,
  },
};

describe('createContract generator', () => {
  const params = {
    sku: 'GN5XB32N',
    planType: 'WDP3P',
    subscription: subId,
    att_subscription: null,
  };
  const resourceType = 'insuranceContracts';
  const resp = {
    data: {
      id: subId,
    },
  };

  let gen = sagas.createContract(createContract(params));

  it('start request', () => {
    expect(gen.next().value).toEqual(put(actions.createPending(resourceType)));
  });

  it('sends the request', () => {
    expect(gen.next().value).toEqual(call(api.create, params));
  });

  it('dispatches a success action', () => {
    expect(gen.next(resp).value).toEqual(put(actions.createSucceeded(resourceType, resp)));
  });

  it('should be done', () => {
    expect(gen.next().done).toEqual(true);
  });
});

describe('createContract', () => {
  const params = {
    sku: 'GN5XB32N',
    planType: 'WDP3P',
    subscription: subId,
    att_subscription: null,
  };

  const gen = sagas.create(createContract(params));

  it('calls create contract', () => {
    expect(gen.next().value).toEqual(call(sagas.createContract, createContract(params)));
  });

  it('start create device', () => {
    expect(gen.next(contract).value).toEqual(
      put(
        actionsInsuredDevice.create({
          contract: contract.id,
          device_specs: params.sku,
          plan_type: params.planType,
        }),
      ),
    );
  });

  it('activate contract', () => {
    expect(gen.next().value).toEqual(put(activateContract(contract)));
  });

  it('end all wrapper for `activate contract` and `create device`', () => {
    expect(gen.next().value).toEqual(all([undefined, undefined]));
  });

  it('redirect to subsription page', () => {
    const { subscription, att_subscription } = params;
    expect(gen.next().value).toEqual(
      put(subscription ? routes.sprintSubscription(subscription) : routes.attSubscription(att_subscription)),
    );
  });

  it('show info message', () => {
    const key = 'general';
    const message = 'Contract successfully created';
    expect(gen.next().value).toEqual(put(actionsNotification.info(key, message)));
  });

  it('should be done', () => {
    expect(gen.next().done).toEqual(true);
  });
});
