import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostCard from './PostCard';
import { sortPosts } from '../actions/sort';
import { Button, Icon, Skeleton } from 'antd';
import { handleGetPosts } from '../actions/posts';
import { SadIcon } from './Icons';

class PostList extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleGetPosts(this.props.match.params.category));
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    if (this.props.match.params.category !== prevProps.match.params.category) {
      dispatch(handleGetPosts(this.props.match.params.category));
    }
  }

  componentWillReceiveProps() {
    this.setState({
      loading: false,
    })
  }

  handleOrder = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const { dispatch, sort } = this.props;

    dispatch(sortPosts(value, !sort.isAscending));
  }

  render() {
    const { posts, sort } = this.props;
    return (
      <div className="timeline">
        <Skeleton loading={this.state.loading} active>
          {
            (posts.length > 0) ? (
              <div className="timeline__list">
                <div className="timeline__actions">
                  <Button onClick={this.handleOrder} value="date" className={(sort.sortBy === 'date') ? 'ant-btn-primary' : ''}>
                    Order by date
                    {
                      (sort.sortBy === 'date' && sort.isAscending) && (
                        <Icon type="caret-down" theme="outlined"/>
                      )
                    }
                    {
                      (sort.sortBy === 'date' && !sort.isAscending) && (
                        <Icon type="caret-up" theme="outlined"/>
                      )
                    }
                  </Button>
                  <Button onClick={this.handleOrder} value="score" className={(sort.sortBy === 'score') ? 'ant-btn-primary' : ''}>
                    Order by score
                    {
                      (sort.sortBy === 'score' && sort.isAscending) && (
                        <Icon type="caret-down" theme="outlined"/>
                      )
                    }
                    {
                      (sort.sortBy === 'score' && !sort.isAscending) && (
                        <Icon type="caret-up" theme="outlined"/>
                      )
                    }
                  </Button>
                </div>
                { posts.map((post) => (post.deleted === false) && (<PostCard key={post.id} post={post} />)) }
              </div>
            ) :
            (
              <div className="timeline__empty-state">
                <p>Oops! There's nothing here!</p>
                <SadIcon />
              </div>
            )
          }
        </Skeleton>
      </div>
    );
  }
}

function mapStateToProps({ posts, sort }) {
  return {
    posts: Object.values(posts).filter(p => p.deleted === false)
      .sort((a, b) => {
        if (sort.sortBy === 'date') {
          if (sort.isAscending) {
            return a.timestamp - b.timestamp;
          } else{
            return b.timestamp - a.timestamp;
          }
        } else {
          if (sort.isAscending) {
            return a.voteScore - b.voteScore;
          } else{
            return b.voteScore - a.voteScore;
          }
        }
      }),
    sort,
  }
}

export default connect(mapStateToProps)(PostList);