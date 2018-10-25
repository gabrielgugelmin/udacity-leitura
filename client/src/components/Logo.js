import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class  extends Component {
  render() {
    return (
      <div className="header__logo">
        <Link to="/">
          <img src={require("../img/logo-white.png")} alt="Gole"/>
        </Link>
      </div>
    );
  }
}