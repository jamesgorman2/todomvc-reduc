import React from 'react';
import { createStore } from 'redux';
import TodoApp from './view/todoapp.js';
import todoStore from './store/todostore.js';

const store = createStore(todoStore);

store.subscribe(() =>
  console.log(store.getState())
);

React.render(
  <TodoApp store={store} />,
  document.getElementById('app')
);
