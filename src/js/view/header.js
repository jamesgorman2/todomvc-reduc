import React, { findDOMNode, PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    onNewTodo: PropTypes.func.isRequired,
  },
  handleNewTodo: function handleNewTodo(e) {
    e.preventDefault();

    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    this.props.onNewTodo(text);
    node.value = '';
  },
  render: function render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleNewTodo}>
          <input ref="input" className="new-todo" placeholder="What needs to be done?" />
        </form>
      </header>
    );
  },
});
