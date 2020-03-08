import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../interfaces/task';
import { MasterDataService } from '../services/master-data.service';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string | undefined;
  displayedColumns: string[] = ['', 'Title', 'Description', 'Completed', 'Created'];

  get hasSelection() {
    if (this.md.filteredTasks) {
      return this.md.filteredTasks.some(task => task.isSelected === true);
    }
  }

  constructor(private router: Router, private md: MasterDataService,
    public alertController: AlertController) {
  }

  async ngOnInit() {
    this.md.tasks = await this.md.getTasks();
    this.completeFilter();
  }

  async deleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Delete task',
      message: `Are you sure you want to delete ${task.title}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            this.md.deleteTask(task.id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteTasks() {

  }

  gotoAddTask() {
    this.router.navigate(['/todos']);
  }

  gotoEditTask(id: number | string) {
    this.router.navigate([`/todos/${id}/edit`]);
  }

  async completeFilter(complete?: boolean) {
    if (complete === true) {
      this.md.filteredTasks = this.md.tasks.filter(todo => todo.completed == true);
    } else if (complete === false) {
      this.md.filteredTasks = this.md.tasks.filter(todo => todo.completed == false);
    } else {
      this.md.filteredTasks = this.md.tasks;
    };
  }

  selectItem(index: number, task: Task) {
    task.isSelected = task.isSelected ? false : true;
    this.md.filteredTasks[index] = task;
  }

  formatDate(date: Date): string {
    return moment(date).format('DD.MM.YYYY, hh:mm:ss')
  }

}
