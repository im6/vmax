/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const STEP = 18;
let totalMovie = null,
  currentEnd = 0;

let getNewList = () => {
  let result = [];
  for(let i = 0; i < currentEnd + STEP; i ++){
    result.push(totalMovie[i]);
  }
  
  currentEnd += STEP;
  return result;
};

const movie = handleActions({
  ['movie/get'](state, action) {
    return state.merge({
      loading: true
    });
  },
  ['movie/get/fail'](state, action) {
    return state.merge({
      loading: true
    });
  },
  ['movie/get/success'](state, action) {
    totalMovie = action.payload;
    return state.merge({
      loading: false,
      list: getNewList()
    });
  },
  
  ['movie/loadmore'](state, action) {
    return state.merge({
      list: getNewList(),
    });
  },
  
  ['movie/play'](state, action) {
    return state;
  },
  ['movie/open'](state, action) {
    return state;
  },

}, Immutable.fromJS({
  list: [],
  loading: true,
  type: null
}));

export default movie;
