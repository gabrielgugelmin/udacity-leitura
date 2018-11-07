import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default class PageNotFound extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '24px' }}>You weren't supposed to find this page!</h1>
        <Link to="/">
          <Button type="primary">Take me to a safe place</Button>
        </Link>
      </div>
    );
  }
}