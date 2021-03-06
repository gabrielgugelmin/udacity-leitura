import { combineReducers } from 'redux';
import posts from './posts';
import categories from './categories';
import sort from './sort';
import comments from './comments';

export default combineReducers({
  posts,
  categories,
  sort,
  comments,
})