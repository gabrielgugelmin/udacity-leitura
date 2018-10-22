import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, Icon, Button } from 'antd';
import { HeartIcon } from './Icons'
import { convertDate } from '../utils/helpers';
import { handleVotePost } from '../actions/posts';


class Post extends Component {
  handleVote = (e) => {
    const vote = e.target.value;
    const { dispatch, post } = this.props;

    dispatch(handleVotePost({
      id: post.id,
      vote: { option: vote }
    }))
  }

  toCategory = (e, category) => {
    e.preventDefault();
    this.props.history.push(`/${category}`);
  }

  render() {
    const { Meta } = Card;
    const { post } = this.props;

    return (
      <Link to={`/${post.id}`}>
        <Card
          className="post"
          hoverable
          actions={[
            <div><HeartIcon style={{ width: '12px', height: '12px', marginRight: '8px' }}/><span>{`${post.commentCount} Comments`}</span></div>]}>
            <header className="post__header">
              <div className="post__category">
                <Icon type="rocket" theme="outlined"/>
                <button onClick={(e) => this.toCategory(e, post.category)}>{post.category}</button>
              </div>
              <div className="post__info">
                / Posted by 
                <span className="post__author">{post.author}</span>
                <span className="post__date">{convertDate(post.timestamp)}</span>
                </div>
            </header>
            <Meta
              title={ post.title }
              description={ post.body }
            />
            <div className="vote">
              <button
                className={`vote__button ${post.vote === 'upVote' ? 'vote__button--active' : '' }`}
                onClick={this.handleVote}
                type="button"
                value="upVote"
                >
                <Icon type="caret-up" theme="outlined"/>
              </button>
              <p>{ post.voteScore }</p>
              <button
                className={`vote__button ${post.vote === 'downVote' ? 'vote__button--active' : '' }`}
                onClick={this.handleVote}
                type="button"
                value="downVote">
                <Icon type="caret-down" theme="outlined"/>
              </button>
            </div>
        </Card>
      </Link>
    );
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = posts[id];

  return {
    post: post,
  }
}

export default withRouter(connect(mapStateToProps)(Post));