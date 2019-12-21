import { call, put } from 'redux-saga/effects';

import * as actions from 'helpers/resourceSagas/actions';

import * as sagas from './sagas';
import * as api from './api';
import { create } from './actions';

describe('create device generator', () => {
  const params = {
    contract: 52,
    sku: 'GN5XB32N',
    planType: 'WDP3P',
  };
  const resourceType = 'insuredDevices';
  const resp = {
    data: {
      device_specs: params.sku,
      plan_type: params.planType,
    },
  };

  let gen = sagas.create(create(params));

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
