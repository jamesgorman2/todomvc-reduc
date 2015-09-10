import React, { PropTypes } from 'react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default React.createClass({
  propTypes: {
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    openForEdit: PropTypes.bool.isRequired,
  },
  getInitialState: function getInitialState() {
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    return {editText: this.props.text};
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
      this.props.onCancelEdit(this.props.index);
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit();
    }
  },
  render: function render() {
    return (
      <li className={(this.props.completed ? 'completed' : '') + (this.props.openForEdit ? ' editing' : '')}>
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={this.props.completed}
                 onChange={() => this.props.onCompletedClick(this.props.index, this.props.completed)} />
          <label onDoubleClick={() => this.props.onEditClick(this.props.index)}>
              {this.props.text}
          </label>
          <button className="destroy" onClick={() => this.props.onDestroyClick(this.props.index)}></button>
        </div>
        <input className="edit"
               ref="editfield"
               value={this.state.editText}
               onChange={this.handleEdit}
               onBlur={this.handleSubmit}
               onKeyDown={this.handleKeyDown} />
      </li>
    );
  },
});
