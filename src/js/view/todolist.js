import React, { PropTypes } from 'react';
import ListItem from './todolistitem';

export default React.createClass({
  propTypes: {
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      openForEdit: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
  },
  render: function render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map((todo, index) =>
          <ListItem key={index}
                    onCompletedClick={this.props.onCompletedClick}
                    onDestroyClick={this.props.onDestroyClick}
                    onEditClick={this.props.onEditClick}
                    onUpdateTodo={this.props.onUpdateTodo}
                    onCancelEdit={this.props.onCancelEdit}
                    index={index}
                    text={todo.text}
                    completed={todo.completed}
                    openForEdit={todo.openForEdit} />
        )}
      </ul>
    );
  },
});
