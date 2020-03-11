import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MasterDataService } from '../../services/master-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  completed: boolean = false;
  taskForm: FormGroup;
  routeSub: Subscription;

  constructor(private formBuilder: FormBuilder, private location: Location, private md: MasterDataService) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false]
    });
  }

  addTask() {
    this.md.createTask(this.taskForm.value);
    this.location.back();
  }

}
