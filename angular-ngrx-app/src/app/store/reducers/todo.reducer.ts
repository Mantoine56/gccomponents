import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../features/todo/todo.model';
import * as TodoActions from '../actions/todo.actions';

/**
 * Interface representing the state shape for the Todo feature
 */
export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: any;
}

/**
 * Initial state for the Todo feature
 */
export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

/**
 * Reducer function for the Todo feature
 * Handles state transitions based on dispatched actions
 */
export const todoReducer = createReducer(
  initialState,
  
  // Handle Todo loading
  on(TodoActions.loadTodos, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  // Handle successful Todo loading
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),
  
  // Handle Todo loading failure
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  // Handle adding a new Todo
  on(TodoActions.addTodo, (state, { text }) => {
    const newTodo: Todo = {
      id: state.todos.length > 0 ? Math.max(...state.todos.map(t => t.id)) + 1 : 1,
      text,
      completed: false
    };
    return {
      ...state,
      todos: [...state.todos, newTodo]
    };
  }),
  
  // Handle toggling a Todo's completed status
  on(TodoActions.toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  // Handle removing a Todo
  on(TodoActions.removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  }))
); 