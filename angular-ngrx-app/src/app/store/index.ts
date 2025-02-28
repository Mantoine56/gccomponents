import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { TodoState, todoReducer } from './reducers/todo.reducer';

/**
 * Interface representing the entire application state
 */
export interface AppState {
  todos: TodoState;
  router: RouterReducerState;
}

/**
 * Object containing all reducers for the application
 */
export const reducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  router: routerReducer
};

/**
 * Meta-reducers for the application
 * These run before the regular reducers
 */
export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []; 