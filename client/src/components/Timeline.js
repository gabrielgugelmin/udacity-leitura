import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { sortPosts } from '../actions/sort';
import { Button, Icon } from 'antd';
import { handleGetPostsByCategory } from '../actions/posts';

class Timeline extends Component {
  state = {
    sortBy: 'date',
    isAscending: true,
  }

  componentDidMount() {
    console.log('componentDidMount')
    const category = this.props.match.params.category;
    const { dispatch } = this.props;

    if(category !== undefined) {
      dispatch(handleGetPostsByCategory(category));
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
          <Button onClick={this.handleOrder} value="date">
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
          <Button onClick={this.handleOrder} value="score">
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
          this.props.postsIds.map((id) => (
            <Post key={id} id={id}/>
          ))
        }
      </div>
    );
  }
}

function mapStateToProps({ posts, sort }) {
  return {
    postsIds: Object.keys(posts)
      .sort((a, b) => {
        if (sort.sortBy === 'date') {
          if (sort.isAscending) {
            return posts[a].timestamp - posts[b].timestamp;
          } else{
            return posts[b].timestamp - posts[a].timestamp;
          }
        } else {
          if (sort.isAscending) {
            return posts[a].voteScore - posts[b].voteScore;
          } else{
            return posts[b].voteScore - posts[a].voteScore;
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