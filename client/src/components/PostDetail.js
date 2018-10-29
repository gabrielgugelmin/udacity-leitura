import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetPost } from '../actions/posts';
import { Icon } from 'antd';
import { convertDate } from '../utils/helpers';
import Vote from './Vote';
import PostActions from './PostActions';
import CommentList from './CommentList';
import Comment from './Comment';

class PostDetail extends Component {
  state = {
    post: {},
    loading: true,
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(handleGetPost(id));
  }

  componentWillReceiveProps(nextProps) {
    const { id, author, body, category, timestamp, title, voteScore, vote } = nextProps.post;
    this.setState({
      post: {
        id,
        author,
        body,
        category,
        timestamp,
        title,
        voteScore,
        vote,
      },
      loading: false,
    });
  }

  render() {
    const { id, author, body, category, timestamp, title } = this.state.post;

    return (
      <div className="post" style={{ backgroundColor: 'white'}}>
        <div className="post__body">
          <header className="post__header">
            <div className="post__category">
              <Icon type="rocket" theme="outlined"/>
              <button onClick={(e) => this.redirectToCategory(e, category)}>{category}</button>
            </div>
            <div className="post__info">
              / Posted by 
              <span className="post__author">{author}</span>
              <span className="post__date">{convertDate(timestamp)}</span>
              </div>
          </header>
          <Vote post={this.state.post} />
          <h2>{title}</h2>
          <p>{body}</p>

          <PostActions info={{ id, category }} />

          <div className="comment">
            <Comment postId={id} />
            <CommentList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }, props) => {
  const { id } = props.match.params
  return {
    post: posts[id]
  }
}

export default connect(mapStateToProps)(PostDetail);