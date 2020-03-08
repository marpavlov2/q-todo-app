import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../interfaces/task';
import { MasterDataService } from '../services/master-data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string | undefined;
  displayedColumns: string[] = ['', 'Title', 'Description', 'Completed', 'Created'];
  filteredTasks: Task[] = [];

  get hasSelection() {
    return this.filteredTasks.some(task => task.isSelected === true);
  }

  constructor(private router: Router, private md: MasterDataService,
    public alertController: AlertController) { }

  ngOnInit() {
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
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Okay',
          handler: () => {
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

  completeFilter(complete?: boolean) {
    if (complete === true) {
      this.filteredTasks = this.md.tasks.filter(todo => todo.completed == true);
    } else if (complete === false) {
      this.filteredTasks = this.md.tasks.filter(todo => todo.completed == false);
    } else {
      this.filteredTasks = this.md.tasks;
    };
  }

  selectItem(index: number, task: Task) {
    task.isSelected = task.isSelected ? false : true;
    this.filteredTasks[index] = task;
  }

}
