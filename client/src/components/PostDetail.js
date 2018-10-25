import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetPost } from '../actions/posts';
import { Skeleton } from 'antd';

class PostDetail extends Component {
  state = {
    author: '',
    body: '',
    category: '',
    commentCount: '',
    timestamp: '',
    title: '',
    voteScore: '',
    loading: true,
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(handleGetPost(id));
  }

  componentWillReceiveProps(nextProps) {
    const { author, body, category, commentCount, timestamp, title, voteScore } = nextProps.post;
    this.setState({
      author,
      body,
      category,
      commentCount,
      timestamp,
      title,
      voteScore,
      loading: false,
    });
  }

  render() {
    const { author, body, category, commentCount, timestamp, title, voteScore } = this.state;

    return (
      <div className="post" style={{ backgroundColor: 'white'}}>
        <Skeleton loading={this.state.loading} active>
          <h2>{author}</h2>
          <h2>{title}</h2>
          <p>{body}</p>
          <p>{category}</p>
          <p>{commentCount}</p>
          <p>{timestamp}</p>
          <p>{voteScore}</p>
        </Skeleton>
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