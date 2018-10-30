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
    commentCount: 0,
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
  }

  componentDidMount() {
    this.setState({
      commentCount: this.props.info.commentCount,
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.commentCount !== this.state.commentCount) {
      this.setState({
        commentCount: nextProps.commentCount,
      })
    }
  }

  editPost = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/${id}/edit`)
  }

  render() {
    const { id, category } = this.props.info;
    const url = `${window.location.origin}/${category}/${id}`;
    const { toHome } = this.state;

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className="post__actions">
        <div className="post__action">
          <CommentIcon />
          <span>{`${this.state.commentCount} Comments`}</span>
        </div>
        <button className="post__action" onClick={(e) => this.editPost(e, id)} >
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

function mapStateToProps({ comments }) {
  return {
    commentCount: Object.values(comments).filter(c => c.deleted === false).length,
  }
}

export default withRouter(connect(mapStateToProps)(PostActions));