import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield [
    takeLatest("movie/get", getMovies),
  ]
}

function* getMovies(action) {
  try {
    const payload = yield call(requester, '/movie/list');
    if(payload.error){
      yield put({
        type: "movie/get/fail",
        payload: {msg: e}
      });
    }else{
      yield put({
        type: "movie/get/success",
        payload: payload
      });
    }
  } catch (e) {
    yield put({
      type: "movie/get/fail",
      payload: {msg: e}
    });
  }
}


export default function*(){
  yield fork(watchers);
  let actCreater = createAction('movie/get');
  yield put(actCreater());
}