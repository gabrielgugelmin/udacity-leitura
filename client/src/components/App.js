import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Col, Row } from 'antd';

// Obtém os dados iniciais necessários para a aplicação
import { handleInitialData } from '../actions/shared';

// Componentes
import Logo from './Logo';
import CategoriesList from './CategoriesList';
import PostDetail from './PostDetail';
import NewPostButton from './NewPostButton';
import Post from './Post';
import PostList from './PostList';

// Estilos
import 'antd/dist/antd.css';
import '../style/style.scss';
import PageNotFound from './PageNotFound';

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
              <Row gutter={24}>
                <Col className="gutter-row" span={14} offset={2}>
                  <Logo />
                </Col>
              </Row>
            </Header>
            <Content style={{ padding: '50px', marginTop: 64 }}>
              <Switch>
                {/* HOME */}
                <Route exact path="/" render={(props) => (
                  <Row gutter={24}>
                    <Col className="gutter-row" span={14} offset={2}>
                      <PostList {...props}/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <NewPostButton />
                      <CategoriesList />
                    </Col>
                  </Row>
                )} />

                {/* NEW POST */}
                <Route path="/submit" render={(props) => (
                  <Row gutter={24}>
                    <Col className="gutter-row" span={20} offset={2}>
                      <Post {...props}/>
                    </Col>
                  </Row>
                )} />

                {/* EDIT POST */}
                <Route path="/:id/edit" render={(props) => (
                  <Row gutter={24}>
                    <Col className="gutter-row" span={20} offset={2}>
                      <Post {...props} />
                    </Col>
                  </Row>
                )} />

                {/* CATEGORIES */}
                <Route exact path="/:category" render={(props) => (
                  <Row gutter={24}>
                     <Col className="gutter-row" span={14} offset={2}>
                      <PostList {...props}/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <NewPostButton />
                      <CategoriesList />
                    </Col>
                  </Row>
                )} />

                {/* POST DETAILS */}
                <Route exact path="/:category/:id" render={(props) => (
                  <Row gutter={24}>
                     <Col className="gutter-row" span={14} offset={2}>
                      <PostDetail {...props}/>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <NewPostButton />
                      <CategoriesList />
                    </Col>
                  </Row>
                )} />
              </Switch>
            </Content>
            <Footer>
              <Row gutter={24}>
                <Col className="gutter-row" span={14} offset={2}>
                  <a href="https://github.com/gabrielgugelmin/udacity-leitura" target="_blank">gabrielgugelmin</a>
                </Col>
              </Row>
            </Footer>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
