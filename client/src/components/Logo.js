import React, { Component } from 'react';

export default class  extends Component {
  render() {
    return (
      <div className="header__logo">
        <img src={require("../img/logo.png")} alt="Gole"/>
      </div>
    );
  }
}