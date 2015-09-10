import React, { findDOMNode, PropTypes } from 'react';

const ENTER_KEY = 13;

export default React.createClass({
  propTypes: {
    onNewTodo: PropTypes.func.isRequired,
  },
  handleKeyDown: function handleKeyDown(e) {
    if (e.which === ENTER_KEY) {
      const node = findDOMNode(this.refs.input);
      const text = node.value.trim();
      this.props.onNewTodo(text);
      node.value = '';
    }
  },
  render: function render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input ref="input"
               className="new-todo"
               placeholder="What needs to be done?"
               autoFocus={true}
               onKeyDown={this.handleKeyDown}/>
      </header>
    );
  },
});
