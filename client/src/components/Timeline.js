import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { sortPosts } from '../actions/sort';
import { Button, Icon } from 'antd';
import { handleGetPosts } from '../actions/posts';

class Timeline extends Component {
  state = {
    sortBy: 'date',
    isAscending: true,
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

  handleOrder = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    const value = e.target.value;
    const { dispatch } = this.props;

    this.setState((state) => ({
      sortBy: value,
      isAscending: !state.isAscending,
    }))
    dispatch(sortPosts(value, this.state.isAscending));
  }

  render() {
    return (
      <div className="timeline">
        <div className="timeline__actions">
          <Button onClick={this.handleOrder} value="date" className={(this.state.sortBy === 'date') ? 'ant-btn-primary' : ''}>
            Order by date
            {
              (this.state.sortBy === 'date' && this.state.isAscending) && (
                <Icon type="caret-down" theme="outlined"/>
              )
            }
            {
              (this.state.sortBy === 'date' && !this.state.isAscending) && (
                <Icon type="caret-up" theme="outlined"/>
              )
            }
          </Button>
          <Button onClick={this.handleOrder} value="score" className={(this.state.sortBy === 'score') ? 'ant-btn-primary' : ''}>
            Order by score
            {
              (this.state.sortBy === 'score' && this.state.isAscending) && (
                <Icon type="caret-down" theme="outlined"/>
              )
            }
            {
              (this.state.sortBy === 'score' && !this.state.isAscending) && (
                <Icon type="caret-up" theme="outlined"/>
              )
            }
          </Button>
        </div>
        {
          this.props.posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))
        }
      </div>
    );
  }
}

function mapStateToProps({ posts, sort }) {
  return {
    posts: Object.values(posts)
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
      })
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   handleSort: (e, isAscending) => {
//     dispatch(sortPosts(e.target.value, isAscending));
//   },
// })

export default connect(mapStateToProps)(Timeline);