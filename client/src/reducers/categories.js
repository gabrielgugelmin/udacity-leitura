import { RECEIVE_CATEGORIES } from "../actions/categories";
import { arrayToObject } from '../utils/helpers'

export default function categories(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        ...arrayToObject(action.categories.categories, 'name'),
      }
    default:
      return state;
  }
}