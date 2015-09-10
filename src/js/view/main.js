import React, { PropTypes } from 'react';
import TodoList from './todolist';
import Filters from '../store/filters.js';

function selectTodos(todos, filter) {
  switch (filter) {
  case Filters.ACTIVE:
    return todos.filter((todo) => !todo.completed);
  case Filters.COMPLETED:
    return todos.filter((todo) => todo.completed);
  default:
    return todos;
  }
}

export default React.createClass({
  propTypes: {
    onCompleteToggle: PropTypes.func.isRequired,
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    filter: PropTypes.string.isRequired,
  },
  render: function render() {
    const totalCount = this.props.todos.length;
    const completedCount = this.props.todos.filter((todo) => todo.completed).length;
    const todos = selectTodos(this.props.todos, this.props.filter);
    if (totalCount > 0) {
      return (
        <section className="main">
          <input className="toggle-all"
                 type="checkbox"
                 checked={totalCount === completedCount}
                 onClick={() => this.props.onCompleteToggle()}/>
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList onCompletedClick={this.props.onCompletedClick}
                    onDestroyClick={this.props.onDestroyClick}
                    todos={todos} />
        </section>
      );
    }
    return null;
  },
});
