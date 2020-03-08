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
  searchTerm: string;
  displayedColumns: string[] = ['Title', 'Description', 'Completed', 'Created'];
  filteredTasks: Task[] = [];

  constructor(private router: Router, private md: MasterDataService) { }

  ngOnInit() {
    this.completeFilter();
  }

  completeFilter(complete?: boolean) {
    if (complete === true) {
      this.filteredTasks = this.md.tasks.filter(todo => todo.completed == true);
    } else if (complete === false) {
      this.filteredTasks = this.md.tasks.filter(todo => todo.completed == false);
    } else {
      this.filteredTasks = this.md.tasks;
    };
  }

  gotoAddTask() {
    this.router.navigate(['/todos']);
  }

  gotoEditTask(id: number | string) {
    this.router.navigate(['/todos/'+ id]);
  }

}
