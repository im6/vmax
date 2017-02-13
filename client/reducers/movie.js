/* eslint-disable */
import { handleActions } from 'redux-actions';
import Immutable, {Map, List} from 'immutable';
import { message } from 'antd';

let temp = [
];
for(var a = 0; a < 20; a ++){
  temp.push({c: 'abs', i: 123, im: '/Users/ZJ/Documents/ZJ/Image/Wallpaper/Creative_idea.jpg', m: 'movie'})
}

const movie = handleActions({
  ['movie/get'](state, action) {
    return state.merge({
      loading: true,
      list: [],
      type: 'latest'
    });
  },
  ['movie/get/fail'](state, action) {
    return state.merge({
      loading: true,
      list: temp,
      type: 'latest'
    });
  },
  ['movie/get/success'](state, action) {
    return state.merge({
      loading: true,
      list: action.payload,
      type: 'latest'
    });
  },

}, Immutable.fromJS({
  list: [],
  loading: true,
  type: null
}));

export default movie;
