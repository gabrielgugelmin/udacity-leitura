import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, Icon } from 'antd';
import { HeartIcon } from './Icons'
import { convertDate } from '../utils/helpers';
import { handleVotePost } from '../actions/posts';


class Post extends Component {
  handleVote = (e) => {
    e.preventDefault();
    console.log(e)
    const vote = e.target.value;
    const { dispatch, post } = this.props;

    dispatch(handleVotePost({
      id: post.id,
      vote: { option: vote }
    }))
  }

  redirectToPostDetail = (e, id, category) => {
    e.preventDefault();
    this.props.history.push(`/${category}/${id}`);
  }

  redirectToCategory = (e, category) => {
    e.preventDefault();
    this.props.history.push(`/${category}`);
  }

  render() {
    const { Meta } = Card;
    const { post } = this.props;

    return (
      <Link to={`/${post.category}/${post.id}`}>
        <Card
          className="post-card"
          hoverable
          actions={[
            <div><HeartIcon style={{ width: '12px', height: '12px', marginRight: '8px' }}/><span>{`${post.commentCount} Comments`}</span></div>,
            <button onClick={(e) => this.redirectToPostDetail(e, post.id, post.category)}>Edit</button>]}>
            <header className="post-card__header">
              <div className="post-card__category">
                <Icon type="rocket" theme="outlined"/>
                <button onClick={(e) => this.redirectToCategory(e, post.category)}>{post.category}</button>
              </div>
              <div className="post-card__info">
                / Posted by 
                <span className="post-card__author">{post.author}</span>
                <span className="post-card__date">{convertDate(post.timestamp)}</span>
                </div>
            </header>
            <Meta
              title={ post.title }
              description={ post.body }
            />
            <div className="vote">
              <button
                className={`vote__button ${post.vote === 'upVote' ? 'vote__button--active' : '' }`}
                onClick={(e) => this.handleVote(e)}
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

function mapStateToProps(state, { post }) {
  return {
    post,
  }
}

export default withRouter(connect(mapStateToProps)(Post));