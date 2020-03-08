import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private displayedColumns: string[] = ['Title', 'Description', 'Completed', 'Created'];
  private todos: Task[] = [
    {id: 1, title: "Title", description: "Description", completed: true, created: "1995-12-17T03:24:00"},
    {id: 1, title: "Title", description: "Description", completed: true, created: "1995-12-17T03:24:00"},
  ];

  constructor(private router: Router) {}

  gotoAddTodo() {
    this.router.navigate(['/todos']);
  }

}
