import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../interfaces/task';
import { MasterDataService } from '../services/master-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  displayedColumns: string[] = ['Title', 'Description', 'Completed', 'Created'];
  todos: Task[] = [...this.md.todos];

  constructor(private router: Router, private md: MasterDataService) { }

  ngOnInit(): void {
    this.todos = this.md.todos;
  }

  completeFilter(complete: boolean) {
    if (complete === true) {
      this.todos = this.md.todos.filter(todo => todo.completed == true);
    } else if (complete === false) {
      this.todos = this.md.todos.filter(todo => todo.completed == false);
    } else {
      this.todos = this.md.todos;
    };
  }

  gotoAddTask() {
    this.router.navigate(['/todos']);
  }

  gotoEditTask(id: number | string) {
    this.router.navigate(['/todos/'+ id]);
  }

}
