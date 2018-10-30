import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { handleAddPost, handleGetPost, handleEditPost } from '../actions/posts';
import { Form, Input, Button, Select, message, Col, Row } from 'antd';
import { generateID } from '../utils/helpers';

class PostForm extends Component {
  state = {
    // redireciona para home
    toHome: false,
    // indica se está editando o post
    editing: false,
    post: {
      id: '',
      title: '',
      author: '',
      body: '',
      category: '',
    }
  }

  componentDidMount() {
    // Desabilita o botão de submit no começo
    this.props.form.validateFields();

    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    // Obtém dados do post
    if (id) {
      dispatch(handleGetPost(id));
    }
  }

  componentWillReceiveProps(nextProps) {
    // Se receber o post via props e a página não estiver em modo edição,
    // atualizamos o state.post para conter os dados do post.
    // Desta forma os campos do formulário são preenchidos
    if ((typeof nextProps.post !== "undefined") && (this.state.editing === false)) {
      const { title, author, body, category } = nextProps.post;

      this.setState({
        editing: true,
        post: {
          title,
          author,
          body,
          category,
        }
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.submitValue = e.value;

    // Caso o formulário não tenha erros, adiciona o novo post
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.addPost(values);
      }
    });
  }

  addPost = (values) => {
    const { dispatch } = this.props;
    const { title, body, author, category } = values;

    dispatch(handleAddPost({
      id: generateID(),
      timestamp: new Date().getTime(),
      title,
      body,
      author,
      category,
    }))
      .then(this.showSuccessMessage())
  }

  showSuccessMessage = () => {
    const messageText = (this.state.editing) ? 'Your post was edited!' : 'Your post was successfully created!';
    message.success(messageText);

    setTimeout(() => {
      this.setState({
          toHome: true,
        })
      }, 500
    );
  };

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState((state) => {
      return {
        post: {
          ...state.post,
          [name]: value
        }
      };
    });
  }

  handleEdit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.props.match.params;
    const { title, body } = this.state.post;

    dispatch(handleEditPost({
      id,
      title,
      body,
    }))
      .then(this.showSuccessMessage())
  }

  render() {
    const { toHome, editing } = this.state;

    // Formulário
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { TextArea } = Input;
    const Option = Select.Option;
    const FormItem = Form.Item;

    // Mostra error nos campos somente após ter foco
    const titleError = isFieldTouched('title') && getFieldError('title');
    const bodyError = isFieldTouched('body') && getFieldError('body');
    const authorError = isFieldTouched('author') && getFieldError('author');
    const categoryError = isFieldTouched('category') && getFieldError('category');

    if (toHome === true) {
      return <Redirect to='/' />
    }

    let title = (editing) ? 'Edit post' : 'Create a post';

    return (
      <div>
        <h2>{title}</h2>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            label="Title"
            validateStatus={titleError ? 'error' : ''}
            help={titleError || ''} >
            {getFieldDecorator('title', { initialValue: this.state.post.title, rules: [{ required: true }] })(
              <Input
                name="title"
                onChange={this.handleInputChange}
              />
            )}
          </FormItem>
          <FormItem
            label="Body"
            validateStatus={bodyError ? 'error' : ''}
            help={bodyError || ''} >
            {getFieldDecorator('body', { initialValue: this.state.post.body, rules: [{ required: true }] })(
              <TextArea
                name="body"
                autosize={{ minRows: 6 }}
                onChange={this.handleInputChange}
              />
            )}
          </FormItem>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <FormItem
                label="Author"
                validateStatus={authorError ? 'error' : ''}
                help={authorError || ''} >
                {getFieldDecorator('author', { initialValue: this.state.post.author, rules: [{ required: true }] })(
                  <Input disabled={this.state.editing} />
                )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={12}>
              <FormItem label="Category"
                validateStatus={categoryError ? 'error' : ''}
                help={categoryError || ''} >
                {getFieldDecorator('category', { initialValue: this.state.post.category, rules: [{ required: true }] })(
                  <Select
                    onChange={this.onCategoryChange}
                    disabled={this.state.editing}>
                    { this.props.categories.map(category => <Option key={category.name}>{category.name}</Option>) }
                  </Select>
                  )}
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Link to="/">
              <Button type="default" style={{ marginRight: '16px' }} >Cancel</Button>
            </Link>
            {
              (this.state.editing) ? (
                <Button
                  disabled={this.hasErrors(getFieldsError())}
                  htmlType="button"
                  onClick={this.handleEdit}
                  type="primary">
                  Save
                </Button>
              ) : (
                <Button
                  disabled={this.hasErrors(getFieldsError())}
                  htmlType="submit"
                  type="primary">
                  Post
                </Button>
              )
            }
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Post = Form.create({
  mapPropsToFields() {
    return;
  }
})(PostForm);

const mapStateToProps = ({ categories, posts }, props) => {
  const { id } = props.match.params;

  return {
    categories: Object.values(categories),
    post: posts[id],
  }
}

export default connect(mapStateToProps)(Post);