import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  displayedColumns: string[] = ['Title', 'Description', 'Completed', 'Created'];
  private todos: Task[] = [
    { id: 1, title: "Task 1", description: "Add a search field", completed: true, created: "1995-12-17T03:24:00" },
    { id: 2, title: "Task 2", description: "Add sort by fields", completed: false, created: "1996-12-17T03:24:00" },
    { id: 3, title: "Task 3", description: "Add sort by fields", completed: true, created: "1997-12-17T03:24:00" },
    { id: 4, title: "Task 4", description: "Add sort by fields", completed: true, created: "1998-12-17T03:24:00" },
    { id: 5, title: "Task 5", description: "Add sort by fields", completed: false, created: "1999-12-17T03:24:00" },
  ];
  todosCopy: Task[] = [...this.todos];

  constructor(private router: Router) { }

  completeFilter(complete: boolean) {
    if (complete === true) {
      this.todosCopy = this.todos.filter(todo => todo.completed == true);
    } else if (complete === false) {
      this.todosCopy = this.todos.filter(todo => todo.completed == false);
    } else {
      this.todosCopy = this.todos;
    };
  }

  gotoAddTodo() {
    this.router.navigate(['/todos']);
  }

}
