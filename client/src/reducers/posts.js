import { RECEIVE_POSTS, VOTE_POST, GET_POSTS_BY_CATEGORY } from "../actions/posts";

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts.reduce((obj, item) => { obj[item.id] = item; return obj }, {}),
      }
    case GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        ...action.posts.reduce((obj, item) => { obj[item.id] = item; return obj }, {}),
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
    default:
      return state;
  }
}