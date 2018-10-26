import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Card, Icon } from 'antd';
import { convertDate } from '../utils/helpers';
import Vote from './Vote';
import PostActions from './PostActions';


class Post extends Component {

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
    const { id, category, author, timestamp, title, body, commentCount } = this.props.post;

    return (
      <Link to={`/${category}/${id}`}>
        <Card
          className="post-card"
          hoverable>
            <header className="post-card__header">
              <div className="post-card__category">
                <Icon type="rocket" theme="outlined"/>
                <button onClick={(e) => this.redirectToCategory(e, category)}>{category}</button>
              </div>
              <div className="post-card__info">
                / Posted by 
                <span className="post-card__author">{author}</span>
                <span className="post-card__date">· {convertDate(timestamp)}</span>
                </div>
            </header>
            <Meta
              title={ title }
              description={ body }
            />
            <Vote post={this.props.post} />
            <PostActions info={{ id, category, commentCount }} />
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