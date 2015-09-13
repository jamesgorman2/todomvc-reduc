import { combineReducers } from 'redux';
import { Actions } from './actions.js';
import Filters from './filters.js';

function newTodo(text, completed = false) {
  return {
    text: text,
    completed: completed,
  };
}

const DEFAULT_STATE = {
  todos: [
    newTodo('todo 1'),
    newTodo('todo 2', true),
    newTodo('todo 3'),
  ],
  filter: Filters.ALL,
};

const DEFAULT_ACTION = { type: 'NOOP' };

function todos(state = DEFAULT_STATE.todos, action = DEFAULT_ACTION) {
  switch (action.type) {
  case Actions.ADD_TODO:
    return [...state, newTodo(action.text)];
  case Actions.TOGGLE_COMPLETE:
    {
      const todo = state[action.index];
      return [
        ...state.slice(0, action.index),
        newTodo(todo.text, !todo.completed),
        ...state.slice(action.index + 1),
      ];
    }
  case Actions.DELETE_TODO:
    return [
      ...state.slice(0, action.index),
      ...state.slice(action.index + 1),
    ];
  case Actions.CLEAR_COMPLETED:
    return state.filter((todo) => !todo.completed);
  case Actions.TOGGLE_COMPLETE_ALL:
    if (state.every((todo) => todo.completed)) {
      return state.map((todo) => newTodo(todo.text, false));
    }
    return state.map((todo) => newTodo(todo.text, true));
  case Actions.UPDATE_TODO:
    {
      const todo = state[action.index];
      return [
        ...state.slice(0, action.index),
        newTodo(action.text, todo.completed),
        ...state.slice(action.index + 1),
      ];
    }
  default:
    return state;
  }
}

function filter(state = DEFAULT_STATE.filter, action = DEFAULT_ACTION) {
  switch (action.type) {
  case Actions.SHOW_ALL:
    return Filters.ALL;
  case Actions.SHOW_COMPLETED:
    return Filters.COMPLETED;
  case Actions.SHOW_ACTIVE:
    return Filters.ACTIVE;
  default:
    return state;
  }
}

export default combineReducers({
  todos,
  filter,
});
