import React, { Component } from 'react';
import { convertDate } from '../utils/helpers';
import Vote from './Vote';

export default class CommentDetail extends Component {
  render() {
    const { author, body, timestamp, voteScore } = this.props.comment;
    const { comment } = this.props;

    return (
      <div className="comment__item">
        <Vote comment={comment} />
        <div className="comment__header">
          <span className="comment__author">{author}</span>
          <span className="comment__voteScore">{voteScore} points</span>
          <span>·</span>
          <span className="comment__date">{convertDate(timestamp)}</span>
        </div>
        <div className="comment__body">
          <p>{body}</p>
        </div>
      </div>
    );
  }
}