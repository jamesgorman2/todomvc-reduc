import React, { PropTypes } from 'react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default React.createClass({
  propTypes: {
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  },
  getInitialState: function getInitialState() {
    return {
      editing: false,
      editText: this.props.text,
    };
  },
  componentDidMount: function componentDidMount() {
    this.focusOnEdit();
  },
  componentDidUpdate: function componentDidUpdate() {
    this.focusOnEdit();
  },
  focusOnEdit: function focusOnEdit() {
    const field = React.findDOMNode(this.refs.edit);
    if (field !== null) {
      field.focus();
      field.setSelectionRange(field.value.length, field.value.length);
    }
  },
  handleDoubleClick: function handleDoubleClick() {
    this.setState({editing: true});
  },
  handleEdit: function handleEdit(e) {
    this.setState({editText: e.target.value});
  },
  handleSubmit: function handleSubmit() {
    const text = this.state.editText.trim();
    if (text.length > 0) {
      this.props.onUpdateTodo(this.props.index, text);
      this.setState(this.getInitialState);
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState(this.getInitialState());
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit();
    }
  },
  render: function render() {
    const edit = (
      <input ref="edit"
             className="edit"
             value={this.state.editText}
             onChange={this.handleEdit}
             onBlur={this.handleSubmit}
             onKeyDown={this.handleKeyDown}/>
    );
    return (
      <li className={(this.props.completed ? 'completed' : '') + (this.state.editing ? ' editing' : '')}>
        <div className="view" ref="view">
          <input className="toggle"
                 type="checkbox"
                 checked={this.props.completed}
                 onChange={() => this.props.onCompletedClick(this.props.index, this.props.completed)}/>
          <label onDoubleClick={this.handleDoubleClick}>
            {this.props.text}
          </label>
          <button className="destroy" onClick={() => this.props.onDestroyClick(this.props.index)}></button>
        </div>
        { this.state.editing ? edit : null }
      </li>
    );
  },
});
