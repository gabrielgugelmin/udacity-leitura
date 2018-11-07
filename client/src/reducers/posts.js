import { RECEIVE_POSTS, VOTE_POST, ADD_POST, GET_POST, DELETE_POST, EDIT_POST, SEARCH_POSTS } from "../actions/posts";
import { arrayToObject } from '../utils/helpers'

export default function posts(state = {}, action) {
  switch (action.type) {
    case SEARCH_POSTS:
      const list = Object.values(state);
      return {
        ...list.filter(post => ((post.title.toLowerCase().includes(action.query)) && post))
      }
    case RECEIVE_POSTS:
      return {
        ...arrayToObject(action.posts, 'id')
      }
    case VOTE_POST:
      let updatedScore = state[action.id].voteScore;
      let updatedVote = action.vote.option;
      let post = state[action.id];

      // Já votou
      if (post.hasOwnProperty('vote') && post.vote !== null) {
        const computedVote = post.vote;

        if (computedVote === 'upVote') {
          if (action.vote.option === 'upVote') {
            // Remove o voto
            updatedScore--;
            updatedVote = null;
          } else {
            // downVote
            // Então tira 1 pelo upVote anterior e mais 1 pelo downVote atual
            updatedScore -= 2;
            updatedVote = 'downVote';
          }
        } else if (computedVote === 'downVote') {
          if (action.vote.option === 'upVote') {
            // upVote
            // Então adiciona 1 pelo upVote atual e mais 1 pela retirada do downVote atual
            updatedScore += 2;
            updatedVote = 'upVote';
          } else {
            // Remove o voto
            updatedScore++;
            updatedVote = null;
          }
        }
      } else {
        action.vote.option === 'upVote' ? updatedScore++ : updatedScore--;
      }

      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: updatedScore,
          vote: updatedVote,
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
    case EDIT_POST:
      return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
          body: action.post.body,
          title: action.post.title,
        }
      }
    case DELETE_POST:
      return {
        ...arrayToObject(Object.values(state).filter( p => p.id !== action.post.id ), 'id')
      }
    default:
      return state;
  }
}