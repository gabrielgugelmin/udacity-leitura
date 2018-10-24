import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddPost } from '../actions/posts';
import { generateID } from '../utils/helpers';
import { Form, Input, Button, Select } from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NewPost extends Component {
  state = {
    defaultCategory: '',
  }

  componentDidMount() {
    // Desabilita o botão de submit no começo
    this.props.form.validateFields();
  }

  componentDidUpdate() {
    console.log('aa', this.props.categories)
    
  }

  onCategoryChange = (value) => {
    this.setState({
      defaultCategory: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.addPost()
      }
    });
  }
  // addPost = (e) => {
  //   const { dispatch } = this.props;
  //   dispatch(handleAddPost({
  //     id: generateID(),
  //     timestamp: new Date().getTime(),
  //     title: 'Titulo teste',
  //     body: 'Lorem ipsum lalalalala',
  //     author: 'autor teste',
  //     category: 'redux',
  //   }));
  // }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { TextArea } = Input;
    const Option = Select.Option;

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');
    const textError = isFieldTouched('text') && getFieldError('text');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          label="Title"
          validateStatus={titleError ? 'error' : ''}
          help={titleError || ''}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="Text"
          validateStatus={textError ? 'error' : ''}
          help={textError || ''}
        >
          {getFieldDecorator('text', {
            rules: [{ required: true }],
          })(
            <TextArea autosize={{ minRows: 4 }} />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true }],
          })(
            <Input type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Select
            value={this.state.defaultCategory}
            onChange={this.onCategoryChange}
          >
            {this.props.categories.map(category => <Option key={category.name}>{category.name}</Option>)}
          </Select>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(NewPost);

const mapStateToProps = ({ categories }) => {
  return {
    categories: Object.values(categories),
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (e) => {
    dispatch(handleAddPost({
      id: generateID(),
      timestamp: new Date().getTime(),
      title: 'Titulo teste',
      body: 'Lorem ipsum lalalalala',
      author: 'autor teste',
      category: 'redux',
    }));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalLoginForm);