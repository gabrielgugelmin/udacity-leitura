import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'antd';

class CategoriesList extends Component {
  handleCategoryPosts = () => {
    console.log(this.props.match.params.category)
  }

  render() {
    const { categories } = this.props;
    return (
      <List
        className="category__list"
        header={<h3>Categories</h3>}
        bordered
        dataSource={categories}
        renderItem={category => (
          <List.Item>
            <Link to={`/${category.path}`} >{category.name}</Link>
          </List.Item>)
        }
      />
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.values(categories),
  }
}

export default connect(mapStateToProps)(CategoriesList);