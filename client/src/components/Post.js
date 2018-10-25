import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { handleAddPost } from '../actions/posts';
import { generateID } from '../utils/helpers';
import { Form, Input, Button, Select, message, Col, Row } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NewPost extends Component {
  state = {
    toHome: false
  }

  componentDidMount() {
    // Desabilita o botão de submit no começo
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.submitValue = e.value;
    console.log(e.target)

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addPost(values);
      }
    });
  }

  addPost = (values) => {
    const { dispatch } = this.props;

    dispatch(handleAddPost({
      id: generateID(),
      timestamp: new Date().getTime(),
      title: values.title,
      body: values.text,
      author: values.author,
      category: values.category,
    }))
      .then(this.success())
  }

  success = () => {
    message.success('Your post was successfully created!');

    setTimeout(() => {
      this.setState({
          toHome: true,
        })
      }, 500
    )
  };

  render() {
    const { toHome } = this.state;

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { TextArea } = Input;
    const Option = Select.Option;

    // Mostra error nos campos somente após ter foco
    const titleError = isFieldTouched('title') && getFieldError('title');
    const textError = isFieldTouched('text') && getFieldError('text');
    const authorError = isFieldTouched('author') && getFieldError('author');
    const categoryError = isFieldTouched('category') && getFieldError('category');

    return (
      <div>
        <h2>Create a post</h2>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem label="Title"
            validateStatus={titleError ? 'error' : ''}
            help={titleError || ''}
          >
            {getFieldDecorator('title', { rules: [{ required: true }] })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Text"
            validateStatus={textError ? 'error' : ''}
            help={textError || ''}
          >
            {getFieldDecorator('text', { rules: [{ required: true }] })(
              <TextArea autosize={{ minRows: 6 }} />
            )}
          </FormItem>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
            <FormItem label="Author"
              validateStatus={authorError ? 'error' : ''}
              help={authorError || ''}
            >
              {getFieldDecorator('author', { rules: [{ required: true }] })(
                <Input />
              )}
            </FormItem>
            </Col>
            <Col className="gutter-row" span={12}>
              <FormItem label="Category"
                validateStatus={categoryError ? 'error' : ''}
                help={categoryError || ''}
              >
                {getFieldDecorator('category', { rules: [{ required: true }] })(
                  <Select onChange={this.onCategoryChange}>
                    {this.props.categories.map(category => <Option key={category.name}>{category.name}</Option>)}
                  </Select>
                  )}
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Link to="/">
              <Button
                type="default"
                style={{ marginRight: '16px' }}
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Post
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const NewPostForm = Form.create()(NewPost);

const mapStateToProps = ({ categories }) => {
  return {
    categories: Object.values(categories),
  }
}

export default connect(mapStateToProps)(NewPostForm);