import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as TodoActions from '../actions/todo.actions';

/**
 * Effects for Todo feature
 * Handles side effects like API calls
 */
@Injectable()
export class TodoEffects {
  // Inject Actions using the new inject function
  private actions$ = inject(Actions);

  /**
   * Effect to load todos
   * In a real app, this would call an API service
   */
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() => {
        // Simulate API call with mock data
        const mockTodos = [
          { id: 1, text: 'Learn Angular', completed: false },
          { id: 2, text: 'Learn NgRx', completed: false },
          { id: 3, text: 'Build an app', completed: false }
        ];
        
        // Return success action with mock data
        // In a real app, this would be: return this.todoService.getTodos()
        return of(TodoActions.loadTodosSuccess({ todos: mockTodos }));
      }),
      catchError(error => of(TodoActions.loadTodosFailure({ error })))
    )
  );

  // Empty constructor since we're using inject() instead
  constructor() {}
} 