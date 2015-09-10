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

function todos(state, action) {
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
  default:
    return state;
  }
}

function filter(state, action) {
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

export default function todoStore(state = DEFAULT_STATE, action = DEFAULT_ACTION) {
  return {
    todos: todos(state.todos, action),
    filter: filter(state.filter, action),
  };
}
