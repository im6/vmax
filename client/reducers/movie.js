/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

const STEP = 18;
let totalMovie = null,
  currentStart = 0,
  currentEnd = 0;

const getNewList = () => {
  let result = [];
  for(let i = currentStart; i < currentEnd + STEP; i ++){
    result.push(totalMovie[i]);
  }
  
  currentEnd += STEP;
  return result;
};

const movie = handleActions({
  
  ['movie/starFilter'](state, action) {
    let name = action.payload.name;
    let filtered = totalMovie.filter(v => {
      return v.r.indexOf('/' + name + '/') > -1;
    });
    return state.merge({
      list: filtered,
      type: 'star'
    });
  },
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
    //totalMovie = action.payload.filter((v,k) => v.im.length < 1);
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

  ['movie/refresh/success'](state, action) {
    message.success('Refresh successfully!');
    totalMovie = action.payload;
    return state.merge({
      loading: false,
      list: getNewList(),
      type: null,
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
  
  
  ['movie/getCategory'](state, action) {
    return state.merge({
      loading: true
    });
  },
  ['movie/getCategory/fail'](state, action) {
    return state.merge({
      loading: false
    });
  },
  
  ['movie/getCategory/success'](state, action) {
    return state.merge({
      category: action.payload,
      loading: false
    });
  },
  ['movie/changeLayout'](state, action) {
    const layout = parseInt(action.payload);
    return state.merge({
      layout
    });
  }, 

  ['movie/jumpTo'](state, action) {
    const ratio = action.payload;
    const crt = Math.round(totalMovie.length * ratio);
    currentStart = crt;
    currentEnd = crt;
    return state.merge({
      list: getNewList(),
    });
  }, 

}, Immutable.fromJS({
  layout: 2,
  list: [],
  loading: true,
  type: null,
  category: []
}));

export default movie;
