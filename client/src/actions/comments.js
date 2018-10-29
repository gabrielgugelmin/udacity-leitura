import { getCommentsByPostId, saveComment, saveCommentVote } from "../utils/api";

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT  = 'ADD_COMMENT';
export const VOTE_COMMENT    = 'VOTE_COMMENT';

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
  console.log('handleAddComment', commentInfo);
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