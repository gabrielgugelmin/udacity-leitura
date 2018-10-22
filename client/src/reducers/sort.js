import { SORT_POSTS } from "../actions/sort";

export default function sort(state = {}, action) {
  switch (action.type) {
    case SORT_POSTS:
      return {
        ...state,
        sortBy: action.sortBy,
        isAscending: action.isAscending,
      }
    default:
      return state;
  }
}