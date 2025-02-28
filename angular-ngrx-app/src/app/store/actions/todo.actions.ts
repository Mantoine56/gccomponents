import { createAction, props } from '@ngrx/store';
import { Todo } from '../../features/todo/todo.model';

/**
 * NgRx Actions for Todo feature
 * These actions define all the ways the Todo state can be modified
 */

export const loadTodos = createAction('[Todo] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ text: string }>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: number }>()
);

export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ id: number }>()
); 