import { saveVote, getByCategory, getPost, getPosts, savePost } from '../utils/api';

export const ADD_POST      = 'ADD_POST';
export const GET_POST      = 'GET_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const VOTE_POST     = 'VOTE_POST';

function receivePost(post) {
  return {
    type: GET_POST,
    post,
  }
}

export function handleGetPost(id) {
  return (dispatch) => {
    return getPost(id)
      .then(post => dispatch(receivePost(post)))
  }
}


function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function handleAddPost(postInfo) {
  return (dispatch) => {
    return savePost({
      id: postInfo.id,
      timestamp: postInfo.timestamp,
      title: postInfo.title,
      body: postInfo.body,
      author: postInfo.author,
      category: postInfo.category,
    }).then((post) => dispatch(addPost(post)))
  }
}

export function receivePosts(posts, category) {
  if (category) {
    return {
      type: RECEIVE_POSTS,
      category,
      posts,
    }
  } else {
    return {
      type: RECEIVE_POSTS,
      posts,
    }
  }
}

export function handleGetPosts(category) {
  return (dispatch) => {
    if (category) {
      return getByCategory(category)
        .then(posts => dispatch(receivePosts(posts, category)))
    } else {
      return getPosts()
        .then(posts => dispatch(receivePosts(posts)))
    }

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