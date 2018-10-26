import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleGetComments } from '../actions/comments';
import Comment from './Comment';

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
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <p>Sem comentários</p>
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