import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popconfirm, message, Input, Button } from 'antd';
import { EditIcon, DeleteIcon } from './Icons';
import Vote from './Vote';
import { handleEditComment, handleDeleteComment } from '../actions/comments';
import { convertDate } from '../utils/helpers';

class CommentDetail extends Component {
  state = {
    editing: false,
    author: this.props.comment.author,
    text: this.props.comment.body,
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  editComment = (e) => {
    e.preventDefault();
    this.setState({
      editing: true,
    })
  }

  handleSaveEditComment = (e) => {
    e.preventDefault();
    const isSaving = e.target.value === 'save';

    this.setState({
      editing: false,
    });

    if(isSaving) {
      const { dispatch, comment } = this.props;
      dispatch(handleEditComment({
        id: comment.id,
        timestamp: new Date().getTime(),
        body: this.state.text,
      }));
    }
  }

  handleDeleteComment = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(handleDeleteComment(this.props.comment.id));
    message.success('Comment deleted!');
  }

  cancelDeleteComment = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    const { author, body, timestamp, voteScore } = this.props.comment;
    const { comment } = this.props;
    const { TextArea } = Input;

    return (
      <div className="comment__item">
        <Vote comment={comment} />
        <div className="comment__header">
          <span className="comment__author">
            {author}
          </span>
          <span className="comment__voteScore">{voteScore} points</span>
          <span>·</span>
          <span className="comment__date">{convertDate(timestamp)}</span>
        </div>
        <div className="comment__body">
          {
            (this.state.editing) ? (
              <TextArea
                autosize={{ minRows: 6 }}
                name="text"
                onChange={this.handleInputChange}
                value={this.state.text}
              />
            ) :
            (
              <p>{body}</p>
            )
          }
        </div>
        <footer className="comment__footer">
          <button className="comment__action" onClick={(e) => this.editComment(e)}>
            <EditIcon />
            <span>Edit</span>
          </button>
          <Popconfirm title="Are you sure delete this comment?" onConfirm={this.handleDeleteComment} onCancel={this.cancelDeleteComment} okText="Yes" cancelText="No">
            <button className="comment__action comment__action--red">
              <DeleteIcon />
              <span>Delete</span>
            </button>
          </Popconfirm>
          {
            (this.state.editing) && (
              <div className="comment__action--right">
                <Button onClick={this.handleSaveEditComment} size="small" style={{ marginRight: '8px' }} value="nd">
                  Cancel
                </Button>
                <Button type="primary" onClick={this.handleSaveEditComment} size="small" value="save">
                  Save
                </Button>
              </div>
            )
          }
        </footer>
      </div>
    );
  }
}

export default connect()(CommentDetail);