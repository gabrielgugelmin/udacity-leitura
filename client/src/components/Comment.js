import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { generateID } from '../utils/helpers';
import { handleAddComment } from '../actions/comments';

class CommentForm extends Component {
  state = {
    author: '',
    text: '',
  }
  componentDidMount() {
    // Desabilita o botão de submit no começo
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.submitValue = e.value;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addComment(values);

        // Tipo setState, mas específico do Ant Design
        this.props.form.setFieldsValue({
          author: '',
          text: ''
        })
      }
    });
  }

  addComment = (values) => {
    const { dispatch } = this.props;

    dispatch(handleAddComment({
      id: generateID(),
      timestamp: new Date().getTime(),
      body: values.text,
      author: values.author,
      parentId: this.props.postId,
    }))
      .then(this.success())
  }

  success = () => {
    message.success('Your comment was added!');

    setTimeout(() => {
      this.setState({
          toHome: true,
        })
      }, 500
    )
  };

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { TextArea } = Input;
    const FormItem = Form.Item;

    // Mostra error nos campos somente após ter foco
    const authorError = isFieldTouched('author') && getFieldError('author');
    const textError = isFieldTouched('text') && getFieldError('text');

    return (
      <div>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={authorError ? 'error' : ''}
            help={authorError || ''}
          >
            {getFieldDecorator('author', { rules: [{ required: true }] })(
              <Input placeholder="Author"/>
            )}
          </FormItem>
          <FormItem
            validateStatus={textError ? 'error' : ''}
            help={textError || ''}
          >
            {getFieldDecorator('text', { rules: [{ required: true }], setFieldsValue: this.props.form.setFieldsValue })(
              <TextArea autosize={{ minRows: 6 }} placeholder="Leave a great comment here" />
            )}
          </FormItem>
          <FormItem className="form--right">
            <Button
              type="primary"
              htmlType="submit"
              disabled={this.hasErrors(getFieldsError())}
            >
              Comment
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Comment = Form.create()(CommentForm);

export default connect()(Comment);