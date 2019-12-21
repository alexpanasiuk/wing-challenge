import { put, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as routes from 'app/routes';
import * as types from './types';
import * as api from './api';
import * as actions from './actions';
import * as actionsInsuredDevice from 'insurance/insuredDevices/actions';
import * as actionsNotification from 'notifications/actions';
import { setInsuranceContract as setSprintContract } from 'subscriptions/sprint/actions';
import { setInsuranceContract as setAttContract } from 'subscriptions/att/actions';

import { findGenerator, getAllGenerator, createGenerator, updateGenerator } from 'helpers/resourceSagas';

export const find = findGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.find,
});

export const fetchFiltered = getAllGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.fetchFiltered,
  endpointArgs: payload => [payload.params],
});

export const updateContract = function*(action) {
  const { contract } = action.payload;
  yield call(
    updateGenerator({
      resourceType: 'insuranceContracts',
      endpoint: api.activate,
      endpointArgs: payload => [contract.id],
      transformResponse: resp => {
        return [
          {
            ...contract,
            status: resp.data === 'success' ? 'active' : 'pending',
          },
        ];
      },
    }),
    action,
  );
};

export const createContract = createGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.create,
  endpointArgs: payload => [payload.params],
});

export function* create(action) {
  const contract = yield call(createContract, action);

  const { sku, planType, subscription, att_subscription } = action.payload.params;
  yield all([
    yield put(
      actionsInsuredDevice.create({
        contract: contract.id,
        device_specs: sku,
        plan_type: planType,
      }),
    ),
    yield put(actions.activateContract(contract)),
  ]);

  yield put(subscription ? routes.sprintSubscription(subscription) : routes.attSubscription(att_subscription));
  yield put(actionsNotification.info('general', 'Contract successfully created'));
}

export function* watchFind() {
  yield takeEvery(types.FIND, find);
}

export function* watchFetchFiltered() {
  yield takeLatest(types.FETCH_FILTERED, fetchFiltered);
}

export function* watchCreate() {
  yield takeEvery(types.CREATE, create);
}

export function* watchUpdate() {
  yield takeEvery(types.ACTIVATE, updateContract);
}

export function* watchInsuranceContracts() {
  yield all([call(watchFind), call(watchFetchFiltered), call(watchCreate), call(watchUpdate)]);
}
