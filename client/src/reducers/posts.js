import { RECEIVE_POSTS, VOTE_POST, ADD_POST, GET_POST } from "../actions/posts";
import { arrayToObject } from '../utils/helpers'

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...arrayToObject(action.posts, 'id')
      }
    case VOTE_POST:
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
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post,
      }
    case GET_POST:
      return {
        [action.post.id]: action.post,
      }
    default:
      return state;
  }
}