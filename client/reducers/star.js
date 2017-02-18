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
  
  ['star/getMovie'](state, action) {
    
  },
  
  ['star/getMovie/success'](state, action) {
    
  },
  
  ['star/getMovie/fail'](state, action) {
    
  },
  
  

}, Immutable.fromJS({
  name: [],
  loading: true,
  movie: []
}));

export default movie;
