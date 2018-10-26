import { GET_COMMENTS } from "../actions/comments";

export default function comments(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...action.comments,
      }
    default:
      return state;
  }
}