import { put, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as types from './types';
import * as api from './api';
import * as actions from './actions';
import { setInsuredDevice } from 'insurance/insuranceContracts/actions';

import { findGenerator, getAllGenerator, createGenerator } from 'helpers/resourceSagas';

export const find = findGenerator({
  resourceType: 'insuredDevices',
  endpoint: api.find,
});

export const create = createGenerator({
  resourceType: 'insuredDevices',
  endpoint: api.create,
  endpointArgs: payload => [payload.params],
});

export const fetchFiltered = getAllGenerator({
  resourceType: 'insuredDevices',
  endpoint: api.fetchFiltered,
  endpointArgs: payload => [payload.params],
});

export function* watchFind() {
  yield takeEvery(types.FIND, find);
}

export function* watchCreate() {
  yield takeEvery(types.CREATE, create);
}

export function* watchFetchFiltered() {
  console.log('watchFetchFiltered');
  yield takeLatest(types.FETCH_FILTERED, fetchFiltered);
}

export function* watchInsuredDevices() {
  console.log('watchInsuredDevices');
  yield all([call(watchFind), call(watchFetchFiltered), call(watchCreate)]);
}
