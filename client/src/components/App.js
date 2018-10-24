import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Timeline from './Timeline';
import Logo from './Logo';
import { Layout, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import '../style/style.scss';
import CategoriesList from './CategoriesList';
import PostDetail from './PostDetail';
import NewPostButton from './NewPostButton';
import NewPost from './NewPost';

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
                  <Switch>
                    <Route exact path="/" component={Timeline} />
                    <Route path="/submit" component={NewPost} />
                    <Route exact path="/:category" component={Timeline} />
                    <Route path="/:category/:id" component={PostDetail} />
                  </Switch>
                </Col>
                <Col className="gutter-row" span={8}>
                  <NewPostButton />
                  <CategoriesList />
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
