import { SORT_POSTS } from "../actions/sort";

const initialState = {
  sortBy: 'date',
  isAscending: true,
}

export default function sort(state = initialState, action) {
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