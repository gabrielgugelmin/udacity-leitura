import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { handleVotePost } from '../actions/posts';
import { handleVoteComment } from '../actions/comments';

class Vote extends Component {
  handleVote = (e) => {
    e.preventDefault();
    const vote = e.target.value;
    const { dispatch, post, comment } = this.props;

    if (post) {
      dispatch(handleVotePost({
        id: post.id,
        vote: { option: vote }
      }))
    } else if (comment) {
      dispatch(handleVoteComment({
        id: comment.id,
        vote: { option: vote }
      }))
    }

  }

  render() {
    const { post, comment } = this.props;

    let vote = '';
    let voteInfo = {};
    let voteClass = '';

    if (post) {
      vote = post.hasOwnProperty('vote') ? post.vote : '';
      voteInfo = post;
    } else if (comment){
      vote = comment.hasOwnProperty('vote') ? comment.vote : '';
      voteInfo = comment;
      voteClass = 'vote--small'
    }

    return (
      <div className={`vote ${voteClass}`}>
        <button
          className={`vote__button ${vote === 'upVote' ? 'vote__button--active' : '' }`}
          onClick={(e) => this.handleVote(e)}
          type="button"
          value="upVote"
          >
          <Icon type="caret-up" theme="outlined"/>
        </button>
        <p>{ voteInfo.voteScore }</p>
        <button
          className={`vote__button ${vote === 'downVote' ? 'vote__button--active' : '' }`}
          onClick={this.handleVote}
          type="button"
          value="downVote">
          <Icon type="caret-down" theme="outlined"/>
        </button>
      </div>
    );
  }
}

export default connect()(Vote);