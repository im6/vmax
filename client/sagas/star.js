import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield [
    takeLatest('star/getName', getName),
  ]
}

function* getName(action) {
  try {
    const payload = yield call(requester, '/worker/star');
    yield put({
        type: "star/getName/success",
        payload: payload.data
      });
  } catch (e) {
    console.error(e)
  }
}

export default function*(){
  yield fork(watchers);
  let actCreater = createAction('star/getName');
  yield put(actCreater());
}