import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleComplete, deleteTodo, toggleCompleteAll, clearCompleted, showAll, showActive, showCompleted } from '../store/actions.js';
import Header from './header';
import Main from './main';
import Footer from './footer';

const TodoApp = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    filter: PropTypes.string.isRequired,
  },
  render: function render() {
    const { dispatch, todos, filter } = this.props;
    return (
      <section className="todoapp">
        <Header onNewTodo={(text) => dispatch(addTodo(text))} />
        <Main todos={todos}
              filter={filter}
              onCompletedClick={(index) => dispatch(toggleComplete(index))}
              onDestroyClick={(index) => dispatch(deleteTodo(index))}
              onCompleteToggle={() => dispatch(toggleCompleteAll())} />
        <Footer todos={todos}
                filter={filter}
                onClearCompletedClick={() => dispatch(clearCompleted())}
                showAll={() => dispatch(showAll())}
                showActive={() => dispatch(showActive())}
                showCompleted={() => dispatch(showCompleted())}/>
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

export default connect(select)(TodoApp);
