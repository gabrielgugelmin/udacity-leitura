import { saveVote, getByCategory, getPost, getPosts, savePost, disablePost, editPost } from '../utils/api';

export const ADD_POST      = 'ADD_POST';
export const EDIT_POST     = 'EDIT_POST';
export const DELETE_POST   = 'DELETE_POST';
export const GET_POST      = 'GET_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const VOTE_POST     = 'VOTE_POST';

function receivePost(post) {
  return {
    type: GET_POST,
    post,
    loading: false,
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

function edit(post) {
  return {
    type: EDIT_POST,
    post,
  }
}

export function handleEditPost(post) {
  return (dispatch) => {
    return editPost(post.id, {
      title: post.title,
      body: post.body,
    }).then((post) => dispatch(edit(post)))
  }
}

function deletePost(post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function handleDeletePost(id) {
  return (dispatch) => {
    return disablePost(id)
      .then(post => dispatch(deletePost(post)))
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