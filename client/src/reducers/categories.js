import { RECEIVE_CATEGORIES } from "../actions/categories";

export default function categories(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      console.log('->', action.categories.categories);
      return {
        ...state,
        ...action.categories.categories,
      }
    default:
      return state;
  }
}