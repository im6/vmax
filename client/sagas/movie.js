import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import requester from '../services/requester';
import { createAction } from 'redux-actions';

function* watchers(a) {
  yield [
    takeLatest("movie/get", getMovies),
    takeLatest("movie/open", openMovies),
    takeLatest("movie/play", playMovies),
    takeLatest("movie/refresh", workerRefresh),
    takeLatest("movie/dup", workerDup),
    takeLatest("movie/search", workerSearch),
    takeLatest("movie/imgpair", workerImgPair),
  ]
}

function* workerImgPair(action) {
  try {
    const payload = yield call(requester, '/worker/imgpair');
    yield put({
        type: "movie/imgpair/success",
        payload: payload.data
      });
  } catch (e) {
    console.error(e)
  }
}

function* workerSearch(action) {
  try {
    const payload = yield call(requester, '/worker/filter', action.payload);
    yield put({
        type: "movie/search/success",
        payload: payload.data
      });
  } catch (e) {
    console.error(e)
  }
}

function* workerDup(action) {
  try {
    const payload = yield call(requester, '/worker/dup');
    yield put({
        type: "movie/dup/success",
        payload: payload.data
      });
  } catch (e) {
    console.error(e)
  }
}


function* workerRefresh(action) {
  try {
    const payload = yield call(requester, '/worker/refresh');
    yield put({
        type: "movie/refresh/success",
        payload: payload.data
      });
  } catch (e) {
    console.error(e)
  }
}

function* openMovies(action) {
  try {
    yield call(requester, '/action/open', {
      url: action.payload.url
    });
  } catch (e) {
    console.error(e)
  }
}

function* playMovies(action) {
  try {
    yield call(requester, '/action/play', {
      url: action.payload.url
    });
  } catch (e) {
    console.error(e)
  }
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