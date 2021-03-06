import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../interfaces/task';
import { MasterDataService } from '../../services/master-data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskPage } from '../task/task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string | undefined;
  displayedColumns: string[] = ['Title', 'Description', 'Completed', 'Created'];

  get hasSelection() {
    if (this.md.filteredTasks) {
      return this.md.filteredTasks.some(task => task.isSelected === true);
    }
  }

  constructor(private router: Router, private md: MasterDataService,
    public alertController: AlertController, private modalController: ModalController) {
  }

  async ngOnInit() {
    this.md.tasks = await this.md.getTasks();
    this.md.filteredTasks = [...this.md.tasks];
  }

  gotoAddTask() {
    this.router.navigate(['/task']);
  }

  gotoEditTask(id: number | string) {
    this.router.navigate([`/edit/${id}`]);
  }

  async filterTasksByComplete(event: CustomEvent) {
    let filter = event.detail.value;
    if (filter === 'true') {
      this.md.filteredTasks = this.md.tasks.filter(todo => todo.completed == true);
    } else if (filter === 'false') {
      this.md.filteredTasks = this.md.tasks.filter(todo => todo.completed == false);
    } else {
      this.md.filteredTasks = [...this.md.tasks];
    }
  }

  async sortTasksByColumn(event: CustomEvent) {
    let column = event.detail.value;
    this.md.filteredTasks = await this.md.getTasks(column);
  }

  selectItem(index: number, task: Task) {
    task.isSelected = task.isSelected ? false : true;
    this.md.filteredTasks[index] = task;
  }

  async deleteTask(task: Task) {
    //TODO: Create dialogs service
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
            this.md.spinner.presentSpinner();
            this.md.deleteTask(task.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteTasks() {
    //TODO: Create dialogs service when more modal windows are needed
    const alert = await this.alertController.create({
      header: 'Delete task',
      message: `Are you sure you want to delete multiple tasks?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: async () => {
            //Should be used only in md.service
            //Used here to prevent multiple showing on delete tasks (for loop)
            //Firebase does not support multiple deletion
            this.md.spinner.presentSpinner();
            for (let i = 0; i < this.md.filteredTasks.length; i++) {
              const task = this.md.filteredTasks[i];
              if (task.isSelected) {
                await this.md.deleteTask(task.id);
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentModal(task: Task) {
    const modal = await this.modalController.create({
      component: TaskPage,
      componentProps: {
        'title': task.title,
        'description': task.description,
        'completed': task.completed
      }
    });
    return await modal.present();
  }
}
