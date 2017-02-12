/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const movie = handleActions({
  ['movie/getLatest'](state, action) {
    return state.merge({
      loading: true,
      list: [],
      type: 'latest'
    });
  },
  
  ['movie/getLikemovie/fail'](state, action) {
    message.error('Getting favourite movie error. Please try again');
    return state.merge({
      loading: false
    });
  },

}, Immutable.fromJS({
  list: [],
  loading: true,
  type: null
}));

export default movie;
