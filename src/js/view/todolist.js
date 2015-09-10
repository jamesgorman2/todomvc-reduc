import React, { PropTypes } from 'react';
import ListItem from './todolistitem';

export default React.createClass({
  propTypes: {
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
  },
  render: function render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map((todo, index) =>
          <ListItem onCompletedClick={this.props.onCompletedClick}
                    onDestroyClick={this.props.onDestroyClick}
                    index={index}
                    text={todo.text}
                    completed={todo.completed}/>
        )}
      </ul>
    );
  },
});
