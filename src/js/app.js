import React from 'react';
import { createStore } from 'redux';
import TodoApp from './view/todoapp.js';
import todoStore from './store/todostore.js';

require('array.from');

const store = createStore(todoStore);

store.subscribe(() =>
  console.log(JSON.stringify(store.getState(), null, ' '))
);

React.render(
  <TodoApp store={store} />,
  document.getElementById('app')
);
