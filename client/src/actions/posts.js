import { saveVote, getByCategory } from '../utils/api';

export const RECEIVE_POSTS          = 'RECEIVE_POSTS';
export const GET_POSTS_BY_CATEGORY  = 'GET_POSTS_BY_CATEGORY';
export const VOTE_POST              = 'VOTE_POST';

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

function getPostsByCategory(category, posts) {
  return {
    type: GET_POSTS_BY_CATEGORY,
    category,
    posts,
  }
}

export function handleGetPostsByCategory(category) {
  return (dispatch) => {
    return getByCategory(category)
      .then(posts =>
        dispatch(getPostsByCategory(category, posts))
      )
  }
}

function votePost({ id, vote }) {
  return {
    type: VOTE_POST,
    id,
    vote,
  }
}

export function handleVotePost(info) {
  return (dispatch) => {
    dispatch(votePost(info));

    return saveVote(info)
      .catch((e) => {
        console.warn('Error in handleVotePost: ', e)
        dispatch(votePost(info));
        alert('Deu erro');
      })
  }
}