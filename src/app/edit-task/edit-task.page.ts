import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MasterDataService } from '../../services/master-data.service';
import { Task } from '../../interfaces/task';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  completed: boolean = false;
  taskForm: FormGroup;
  task: Task | undefined;
  routeSub: Subscription;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private md: MasterDataService,
    private location: Location, public alertController: AlertController) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(async params => {
      let taskId = params['id'];
      this.task = await this.md.tasks.find(task => task.id === taskId);
      if (!this.task) {
        this.task = await this.md.getTask(taskId);
      }
      this.restoreTask(this.task);
    });
  }

  async restoreTask(task: Task) {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description
    });
    this.completed = task.completed;
  }

  editTask() {
    let task = this.taskForm.value;
    task.id = this.task.id;
    task.creted = this.task.created;
    this.md.editTask(task);
    this.location.back();
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
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }

}
