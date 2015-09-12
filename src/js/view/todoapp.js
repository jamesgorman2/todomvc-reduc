import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleComplete, deleteTodo, toggleCompleteAll, clearCompleted, showAll, showActive, showCompleted, updateTodo } from '../store/actions.js';
import Header from './header';
import Main from './main';
import Footer from './footer';
import Filters from '../store/filters.js';

const TodoApp = React.createClass({
  propTypes: {
    onNewTodo: PropTypes.func.isRequired,
    onCompletedClick: PropTypes.func.isRequired,
    onDestroyClick: PropTypes.func.isRequired,
    onCompleteToggle: PropTypes.func.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    onClearCompletedClick: PropTypes.func.isRequired,
    showAll: PropTypes.func.isRequired,
    showActive: PropTypes.func.isRequired,
    showCompleted: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    filter: PropTypes.string.isRequired,
  },
  render: function render() {
    const { todos, filter } = this.props;
    return (
      <section className="todoapp">
        <Header onNewTodo={this.props.onNewTodo} />
        <Main todos={todos}
              filter={(completed) =>
                filter === Filters.ALL ||
                (filter === Filters.ACTIVE && !completed) ||
                (filter === Filters.COMPLETED && completed)
              }
              onCompletedClick={this.props.onCompletedClick}
              onDestroyClick={this.props.onDestroyClick}
              onCompleteToggle={this.props.onCompleteToggle}
              onUpdateTodo={this.props.onUpdateTodo} />
        <Footer todos={todos}
                filter={filter}
                onClearCompletedClick={this.props.onClearCompletedClick}
                showAll={this.props.showAll}
                showActive={this.props.showActive}
                showCompleted={this.props.showCompleted}/>
      </section>
    );
  },
});

function select(state) {
  return {
    todos: state.todos,
    filter: state.filter,
  };
}
function dispatchToProps(dispatch) {
  return {
    onNewTodo: (text) => dispatch(addTodo(text)),
    onCompletedClick: (index) => dispatch(toggleComplete(index)),
    onDestroyClick: (index) => dispatch(deleteTodo(index)),
    onCompleteToggle: () => dispatch(toggleCompleteAll()),
    onUpdateTodo: (index, text) => dispatch(updateTodo(index, text)),
    onClearCompletedClick: () => dispatch(clearCompleted()),
    showAll: () => dispatch(showAll()),
    showActive: () => dispatch(showActive()),
    showCompleted: () => dispatch(showCompleted()),
  };
}

export default connect(select, dispatchToProps)(TodoApp);
