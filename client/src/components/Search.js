import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Search from 'antd/lib/input/Search';
import { searchPosts } from '../actions/posts';

class SearchBar extends Component {
  state = {
    posts: this.props.posts,
  }

  filterPosts = (query) => {
    const postsArray = Object.values(this.props.posts);

    if (postsArray.length > 0) {
      const { dispatch } = this.props;
      dispatch(searchPosts(query));
    }
  }

  handleSearch = (query) => {
    const postsResult = this.filterPosts(query);
    this.props.history.push({
      pathname: `/search/${query}`,
      state: { postsResult }
    });
  }

  render() {
    return (
      <span>
        <Search onSearch={this.handleSearch} />
      </span>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts,
  }
}

export default withRouter(connect(mapStateToProps)(SearchBar));