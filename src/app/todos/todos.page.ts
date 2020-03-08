import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MasterDataService } from '../services/master-data.service';
import { Location } from '@angular/common';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit, OnDestroy {
  isEditing: boolean;
  completed: boolean = false;
  taskForm: FormGroup;
  routeSub: Subscription;

  constructor(private formBuilder: FormBuilder, private location: Location, private route: ActivatedRoute, private md: MasterDataService) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(async params => {
      this.isEditing = params['edit'];
      let taskId = params['id'];
      let task = await this.md.tasks.find(task => task.id === taskId);
      if (task) {
        this.restoreTask(task);
      }
    });
  }

  addTask() {
    this.md.createTask(this.taskForm.value);
    this.location.back();
  }

  restoreTask(task: Task) {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description
    });
    this.completed = task.completed;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
