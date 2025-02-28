import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store';
import * as TodoActions from '../../store/actions/todo.actions';
import * as fromTodo from '../../store/selectors/todo.selectors';
import { Todo } from './todo.model';

/**
 * Todo Component
 * Demonstrates NgRx usage with a simple Todo application
 */
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  // Observables from the store
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  
  // Form control for new todo input
  todoInput = new FormControl('', [Validators.required, Validators.minLength(3)]);

  /**
   * Constructor - inject the NgRx store
   */
  constructor(private store: Store<AppState>) {
    // Initialize store selectors
    this.todos$ = this.store.select(fromTodo.selectAllTodos);
    this.loading$ = this.store.select(fromTodo.selectTodoLoading);
    this.error$ = this.store.select(fromTodo.selectTodoError);
  }

  /**
   * Initialize component - load todos from store
   */
  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  /**
   * Add a new todo
   */
  addTodo(): void {
    if (this.todoInput.invalid) {
      return;
    }
    
    this.store.dispatch(TodoActions.addTodo({ text: this.todoInput.value || '' }));
    this.todoInput.reset();
  }

  /**
   * Toggle the completed state of a todo
   */
  toggleTodo(id: number): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  /**
   * Remove a todo
   */
  removeTodo(id: number): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }
} 