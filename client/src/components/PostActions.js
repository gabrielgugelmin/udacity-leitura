import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { CommentIcon, EditIcon, ShareIcon, DeleteIcon } from './Icons';
import { Popconfirm, message } from 'antd';
import { copyToClipboard } from '../utils/helpers';
import { handleDeletePost } from '../actions/posts';

class PostActions extends Component {
  state = {
    toHome: false,
  }

  handleCopyURL = (e, url) => {
    e.preventDefault();
    copyToClipboard(url);
    this.copyURLMessage();
  }

  copyURLMessage = () => {
    message.success('Post link copied to your clipboard!');
  }

  handleDeletePost = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(handleDeletePost(this.props.info.id));
    message.success('Post deleted!');

    // Se não estiver na home, manda pra lá
    if (this.props.match.path !== '/') {
      setTimeout(() => {
        this.setState({
            toHome: true,
          })
        }, 500
      )
    }
  }

  cancelDeletePost = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(this.props)
  }

  render() {
    const { id, category, commentCount } = this.props.info;
    const url = `${window.location.origin}/${category}/${id}`;
    const { toHome } = this.state;

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className="post__actions">
        <div className="post__action">
          <CommentIcon />
          <span>{`${commentCount} Comments`}</span>
        </div>
        <button className="post__action" onClick={(e) => this.redirectToPostDetail(e, id, category)}>
          <EditIcon />
          <span>Edit</span>
        </button>
        <button className="post__action" onClick={(e) => this.handleCopyURL(e, url)}>
          <ShareIcon />
          <span>Share</span>
        </button>
        <Popconfirm title="Are you sure delete this post?" onConfirm={this.handleDeletePost} onCancel={this.cancelDeletePost} okText="Yes" cancelText="No">
          <button className="post__action post__action--red">
            <DeleteIcon />
            <span>Delete</span>
          </button>
        </Popconfirm>
      </div>
    );
  }
}

export default withRouter(connect()(PostActions));