import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import movies from './movieslist';
import create from './creationmovie';

export default combineReducers({
  router: routerReducer,
  movies,
  create
});
