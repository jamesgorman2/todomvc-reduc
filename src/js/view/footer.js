import React, { PropTypes } from 'react';
import Filters from '../store/filters.js';

function handleAnchor(e, f) {
  e.preventDefault();
  f();
}

export default React.createClass({
  propTypes: {
    onClearCompletedClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    showAll: PropTypes.func.isRequired,
    showActive: PropTypes.func.isRequired,
    showCompleted: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
  },
  render: function render() {
    const totalCount = this.props.todos.length;
    if (totalCount > 0) {
      const completedCount = this.props.todos.filter((todo) => todo.completed).length;
      const activeCount = totalCount - completedCount;

      return (
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
          </span>
          <ul className="filters">
            <li>
              <a href="#/"
                 className={this.props.filter === Filters.ALL ? 'selected' : ''}
                 onClick={(e) => handleAnchor(e, this.props.showAll)}>All</a>
            </li>
            <li>
              <a href="#/active"
                 className={this.props.filter === Filters.ACTIVE ? 'selected' : ''}
                 onClick={(e) => handleAnchor(e, this.props.showActive)}>Active</a>
            </li>
            <li>
              <a href="#/completed"
                 className={this.props.filter === Filters.COMPLETED ? 'selected' : ''}
                 onClick={(e) => handleAnchor(e, this.props.showCompleted)}>Completed</a>
            </li>
          </ul>
          {(() => {
            if (completedCount > 0) {
              return (<button className="clear-completed" onClick={() => this.props.onClearCompletedClick()}>Clear completed</button>);
            }
            return null;
          })()}
        </footer>
      );
    }
    return null;
  },
});
