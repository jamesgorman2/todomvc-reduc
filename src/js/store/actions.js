
export const Actions = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_COMPLETE: 'TOGGLE_COMPLETE',
  DELETE_TODO: 'DELETE_TODO',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  TOGGLE_COMPLETE_ALL: 'TOGGLE_COMPLETE_ALL',
  OPEN_FOR_EDIT: 'OPEN_FOR_EDIT',
  CANCEL_EDIT: 'CANCEL_EDIT',
  UPDATE_TODO: 'UPDATE_TODO',
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
};

export function addTodo(text) {
  return {
    type: Actions.ADD_TODO,
    text: text,
  };
}

export function toggleComplete(index) {
  return {
    type: Actions.TOGGLE_COMPLETE,
    index: index,
  };
}

export function deleteTodo(index) {
  return {
    type: Actions.DELETE_TODO,
    index: index,
  };
}

export function toggleCompleteAll() {
  return {
    type: Actions.TOGGLE_COMPLETE_ALL,
  };
}

export function clearCompleted() {
  return {
    type: Actions.CLEAR_COMPLETED,
  };
}

export function openForEdit(index) {
  return {
    type: Actions.OPEN_FOR_EDIT,
    index: index,
  };
}

export function cancelEdit(index) {
  return {
    type: Actions.CANCEL_EDIT,
    index: index,
  };
}

export function updateTodo(index, text) {
  return {
    type: Actions.UPDATE_TODO,
    index: index,
    text: text,
  };
}

export function showAll() {
  return {
    type: Actions.SHOW_ALL,
  };
}

export function showActive() {
  return {
    type: Actions.SHOW_ACTIVE,
  };
}

export function showCompleted() {
  return {
    type: Actions.SHOW_COMPLETED,
  };
}
