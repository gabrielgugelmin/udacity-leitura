import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { handleVotePost } from '../actions/posts';

class Vote extends Component {
  handleVote = (e) => {
    e.preventDefault();
    const vote = e.target.value;
    const { dispatch, post } = this.props;

    dispatch(handleVotePost({
      id: post.id,
      vote: { option: vote }
    }))
  }

  render() {
    const post = this.props.post;
    const vote = post.hasOwnProperty('vote') ? post.vote : '';
    return (
      <div className="vote">
        <button
          className={`vote__button ${vote === 'upVote' ? 'vote__button--active' : '' }`}
          onClick={(e) => this.handleVote(e)}
          type="button"
          value="upVote"
          >
          <Icon type="caret-up" theme="outlined"/>
        </button>
        <p>{ post.voteScore }</p>
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