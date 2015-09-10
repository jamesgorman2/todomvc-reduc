import React, { PropTypes } from 'react';
import ListItem from './todolistitem';

export default React.createClass({
  propTypes: {
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
  },
  render: function render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map((todo, index) => {
          if (this.props.filter(todo.completed)) {
            return (<ListItem key={index}
                             onCompletedClick={this.props.onCompletedClick}
                             onDestroyClick={this.props.onDestroyClick}
                             onUpdateTodo={this.props.onUpdateTodo}
                             index={index}
                             text={todo.text}
                             completed={todo.completed} />);
          }
          return null;
        })}
      </ul>
    );
  },
});
