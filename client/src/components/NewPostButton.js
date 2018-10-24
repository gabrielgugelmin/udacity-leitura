import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default class NewPostButton extends Component {
  render() {
    return (
      <Link to="/submit">
        <Button block type="primary" style={{ marginBottom: '16px' }}>
          New Post
        </Button>
      </Link>
    );
  }
}