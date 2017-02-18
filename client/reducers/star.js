/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';


const movie = handleActions({
  ['star/getName'](state, action) {
    return state.merge({
      loading: true
    });
  },
  ['star/getName/fail'](state, action) {
    return state.merge({
      loading: false
    });
  },
  
  ['star/getName/success'](state, action) {
    return state.merge({
      name: action.payload,
      loading: false
    });
  }, 
  

}, Immutable.fromJS({
  name: [],
}));

export default movie;
