import React, { PropTypes } from 'react';
import TodoList from './todolist';

export default React.createClass({
  propTypes: {
    onCompleteToggle: PropTypes.func.isRequired,
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    filter: PropTypes.func.isRequired,
  },
  render: function render() {
    const totalCount = this.props.todos.length;
    const completedCount = this.props.todos.filter((todo) => todo.completed).length;
    const todos = this.props.todos;
    if (totalCount > 0) {
      return (
        <section className="main">
          <input className="toggle-all"
                 type="checkbox"
                 checked={totalCount === completedCount}
                 onChange={() => this.props.onCompleteToggle()}/>
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList onCompletedClick={this.props.onCompletedClick}
                    onDestroyClick={this.props.onDestroyClick}
                    onUpdateTodo={this.props.onUpdateTodo}
                    filter={this.props.filter}
                    todos={todos} />
        </section>
      );
    }
    return null;
  },
});
