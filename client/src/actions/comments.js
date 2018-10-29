import { getCommentsByPostId, saveComment, saveCommentVote, editComment, disableComment } from "../utils/api";

export const GET_COMMENTS   = 'GET_COMMENTS';
export const ADD_COMMENT    = 'ADD_COMMENT';
export const EDIT_COMMENT   = 'EDIT_COMMENT';
export const VOTE_COMMENT   = 'VOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments,
  }
}

export function handleGetComments(postId) {
  return (dispatch) => {
    return getCommentsByPostId(postId)
      .then(comments => dispatch(getComments(comments)))
  }
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function handleAddComment(commentInfo) {
  return (dispatch) => {
    return saveComment({
      id: commentInfo.id,
      timestamp: commentInfo.timestamp,
      body: commentInfo.body,
      author: commentInfo.author,
      parentId: commentInfo.parentId,
    }).then((comment) => dispatch(addComment(comment)))
  }
}

function edit(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  }
}

export function handleEditComment(comment) {
  return (dispatch) => {
    return editComment(comment.id, {
      timestamp: comment.timestamp,
      body: comment.body,
    }).then((comment) => dispatch(edit(comment)))
  }
}

function deleteComment (comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  }
}

export function handleDeleteComment(comment) {
  return (dispatch) => {
    return disableComment(comment)
      .then(comment => dispatch(deleteComment(comment)))
  }
}

function voteComment({ id, vote }) {
  return {
    type: VOTE_COMMENT,
    id,
    vote,
  }
}

export function handleVoteComment(info) {
  return (dispatch) => {
    dispatch(voteComment(info));

    return saveCommentVote(info)
      .catch((e) => {
        console.warn('Error in handleVotePost: ', e)
        dispatch(voteComment(info));
        alert('Deu erro');
      })
  }
}