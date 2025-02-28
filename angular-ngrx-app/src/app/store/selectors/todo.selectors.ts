import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducer';

/**
 * Feature selector for the Todo state
 */
export const selectTodoState = createFeatureSelector<TodoState>('todos');

/**
 * Selector to get all todos
 */
export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

/**
 * Selector to get loading status
 */
export const selectTodoLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

/**
 * Selector to get error state
 */
export const selectTodoError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);

/**
 * Selector to get completed todos
 */
export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => todo.completed)
);

/**
 * Selector to get active (not completed) todos
 */
export const selectActiveTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => !todo.completed)
); 