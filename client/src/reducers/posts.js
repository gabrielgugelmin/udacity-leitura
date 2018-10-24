import { RECEIVE_POSTS, VOTE_POST, GET_POSTS_BY_CATEGORY, ADD_POST } from "../actions/posts";
import { arrayToObject } from '../utils/helpers'

export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...arrayToObject(action.posts, 'id')
      }
    // case GET_POSTS_BY_CATEGORY:
    //   return {
    //     // ...state
    //     ...action.posts.reduce((obj, item) => { obj[item.id] = item; return obj }, {}),
    //     // ...action.posts
    //   }
    case VOTE_POST:
      // const x = Object.values(state);
      // var post = x.filter(obj => {
      //   return obj.id === action.id
      // })
      // let updatedScore = post.voteScore;
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
      console.log(action);
      return {
        ...state,
        [action.post.id]: action.post,
      }
    default:
      return state;
  }
}