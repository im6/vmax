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

  ['movie/refresh'](state, action) {
    return state.merge({
      loading: true,
    });
  },

  ['movie/dup'](state, action) {
    return state.merge({
      loading: true,
    });
  },

  ['movie/dup/success'](state, action) {
    return state.merge({
      loading: false,
      list: action.payload,
      type: 'dup'
    });
  },

  ['movie/return'](state, action) {
    return state.merge({
      loading: false,
      list: getNewList(),
      type: null
    });
  },
  
  ['movie/search'](state, action) {
    return state.merge({
      loading: true
    });
  },
  
  ['movie/search/success'](state, action) {
    if(action.payload.length === 0){
      message.warning('No result.');
      return state.merge({
        loading: false
      });     
    }else{
      return state.merge({
        loading: false,
        list: action.payload,
        type: 'search'
      });      
    }
  }, 

  ['movie/imgpair'](state, action) {
    return state.merge({
      loading: true
    });
  },
  ['movie/imgpair/success'](state, action) {
    var result = action.payload;    
    message.success('pair successfully: ' + result.length);    
    console.log('=====================');
    var txt = 'no match.';
    if(result.length > 0){
      txt = result
    }
    console.log(txt);
    console.log('=====================');
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
