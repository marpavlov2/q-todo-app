import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../interfaces/task';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MasterDataService } from '../services/master-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit, OnDestroy {
  todoForm: FormGroup;
  todo: Task; 
  routeSub: Subscription;

  constructor(private formBuilder: FormBuilder, private location: Location, private route: ActivatedRoute, private md: MasterDataService) {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params); //log the entire params object
      console.log(params['id']); //log the value of id
    });
  }

  addTask(){
    this.md.tasks.push(this.todoForm.value);
    this.location.back();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
