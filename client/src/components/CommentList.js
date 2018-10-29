import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleGetComments } from '../actions/comments';
import CommentDetail from './CommentDetail';
import { CommentsIcon } from './Icons';

class CommentList extends Component {
  componentDidMount() {
    const postId = this.props.match.params.id;
    console.log('did mount', postId);
    const { dispatch } = this.props;
    dispatch(handleGetComments(postId));
  }

  render() {
    const { comments } = this.props;
    return (
      <div>
        {
          (comments.length > 0) ? (
            this.props.comments.map(comment => (
              <CommentDetail key={comment.id} comment={comment} />
            ))
          ) : (
          <div className="comment__empty-state">
            <p>No Comments Yet</p>
            <CommentsIcon />
          </div>
          )
        }
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments: Object.values(comments),
  }
}

export default withRouter(connect(mapStateToProps)(CommentList));