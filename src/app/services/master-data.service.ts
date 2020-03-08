import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  public tasks: Task[] = [];
  public filteredTasks: Task[] | undefined;

  constructor() { }

  async getTasks(): Promise<Task[]> {
    let tasksCollection = firebase.firestore().collection('tasks').get();
    return tasksCollection.then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => {
        let data = doc.data() as Task;
        data.id = doc.id;
        data.created = doc.data().created.toDate();
        return data;
      });
    });
  }

  createTask(task: Task) {
    firebase.firestore().collection('tasks').add({
      'title': task.title,
      'description': task.description,
      'completed': task.completed,
      'created': new Date()
    }).then((querySnapshot) => {
      querySnapshot.onSnapshot(doc => {
        let data = doc.data() as Task;
        data.id = doc.id;
        data.created = doc.data().created.toDate();
        this.filteredTasks.push(data);
      })
    }).catch(err => {
      console.log('Error');
    });
  }
}
