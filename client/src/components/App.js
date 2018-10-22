import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Timeline from './Timeline';
import Logo from './Logo';
import { Layout, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import '../style/style.scss';
import CategoriesList from './CategoriesList';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Router>
        <div className="App">
          <Layout className="layout">
            <Header className="header">
              <Link to="/">
                <Logo />
              </Link>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Row gutter={16}>
                <Col className="gutter-row" span={16}>
                  <Route path="/" exact component={Timeline} />
                  <Route path="/:category" component={Timeline} />
                </Col>
                <Col className="gutter-row" span={8}>
                  <CategoriesList/>
                </Col>
              </Row>
              </div>
            </Content>
            <Footer>footer</Footer>
          </Layout>
        </div>
      </Router>
    );
  }
}

// function mapStateToProps({ posts }) {
//   return {
//     loading: !posts
//   }
// }

export default connect()(App);
