import React, { PropTypes } from 'react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default React.createClass({
  propTypes: {
    onUpdateTodo: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  },
  getInitialState: function getInitialState() {
    return {
      editText: this.props.text,
    };
  },
  componentDidMount: function componentDidMount() {
    const field = React.findDOMNode(this.refs.edit);
    console.log(this.refs.edit);
    console.log(field);
    if (field !== null) {
      field.focus();
      field.setSelectionRange(field.value.length, field.value.length);
    }
  },
  handleEdit: function handleEdit(e) {
    this.setState({editText: e.target.value});
  },
  handleSubmit: function handleSubmit() {
    const text = this.state.editText.trim();
    if (text.length > 0) {
      this.props.onUpdateTodo(this.props.index, text);
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState(this.getInitialState());
      this.props.onCancel();
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit();
    }
  },
  render: function render() {
    return (
      <input ref="edit"
             className="edit"
             value={this.state.editText}
             onChange={this.handleEdit}
             onBlur={this.handleSubmit}
             onKeyDown={this.handleKeyDown}/>
    );
  },
});
