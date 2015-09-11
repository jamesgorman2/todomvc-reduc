import React, { PropTypes } from 'react';
import EditBox from './editbox.js';

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
    };
  },
  handleDoubleClick: function handleDoubleClick() {
    this.setState({editing: true});
  },
  handleUpdate: function handleUpdate(index, text) {
    this.props.onUpdateTodo(index, text);
    this.setState(this.getInitialState);
  },
  handleCancel: function handleCancel() {
    this.setState(this.getInitialState);
  },
  render: function render() {
    const edit = (
      <EditBox onUpdateTodo={this.handleUpdate}
               onCancel={this.handleCancel}
               index={this.props.index}
               text={this.props.text}/>
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
