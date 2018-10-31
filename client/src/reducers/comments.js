import { GET_COMMENTS, ADD_COMMENT, VOTE_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from "../actions/comments";
import { arrayToObject } from "../utils/helpers";

export default function comments(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...arrayToObject(action.comments, 'id')
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment,
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          body: action.comment.body,
          timestamp: action.comment.timestamp,
        }
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          deleted: true,
        }
      }
    case VOTE_COMMENT:
      let updatedScore = state[action.id].voteScore;

      if (action.vote.option === 'upVote') {
        updatedScore++;
      } else if (action.vote.option === 'downVote') {
        updatedScore--;
      }
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: updatedScore,
          vote: action.vote.option,
        }
      }
    default:
      return state;
  }
}