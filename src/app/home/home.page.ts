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
    { id: 1, title: "Task 1", description: "Add a create new button", completed: true, created: "1995-12-17T03:24:00" },
    { id: 2, title: "Task 2", description: "Add sort by fields", completed: true, created: "1996-12-17T03:24:00" },
    { id: 3, title: "Task 3", description: "Add a search field to filter TODOs by title and description", completed: false, created: "1997-12-17T03:24:00" },
    { id: 4, title: "Task 4", description: "Add group actions: DELETE", completed: false, created: "1998-12-17T03:24:00" },
    { id: 5, title: "Task 5", description: "Add pagination", completed: false, created: "1999-12-17T03:24:00" },
    { id: 6, title: "Task 6", description: "Add view task", completed: false, created: "1999-12-17T03:24:00" },
    { id: 7, title: "Task 7", description: "Any delete action should show a warning message before actually deleting", completed: false, created: "1999-12-17T03:24:00" },
    { id: 8, title: "Task 8", description: "Make a backend for saving and reading tasks on mongoDB or Firebase", completed: false, created: "1999-12-17T03:24:00" },
    { id: 9, title: "Task 9", description: "Upload the application to github + describe the build/run process in the Readme file", completed: false, created: "1999-12-17T03:24:00" },
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
