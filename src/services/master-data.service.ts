import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import * as firebase from 'firebase';
import { ToastService } from './toast.service';

const TASKS_ENDPOINT = firebase.firestore().collection('tasks');

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  public tasks: Task[] = [];
  public filteredTasks: Task[] | undefined;

  constructor(public toast: ToastService) { }

  addTask(task: Task) {
    TASKS_ENDPOINT.add({
      'title': task.title,
      'description': task.description,
      'completed': task.completed,
      'created': new Date()
    }).then((docRef) => {
      docRef.get().then(doc => {
        if (doc.exists) {
          let data = doc.data() as Task;
          data.id = doc.id;
          data.created = doc.data().created.toDate();
          this.tasks.push(data);
          this.filteredTasks = [...this.tasks];
        }
      });
      this.toast.presentToast('Task successfully added.');
    }).catch(() => {
      this.toast.presentToast('Error creating task.');
    });
  }

  async getTask(id: string): Promise<Task> {
    return TASKS_ENDPOINT.doc(id).get().then(async doc => {
      if (doc.exists) {
        let data = doc.data() as Task;
        data.id = doc.id;
        return data;
      }
    });
  }

  async editTask(task: Task) {
    TASKS_ENDPOINT.doc(task.id).update(task).then(() => {
      this.toast.presentToast('Task successfully updated!');
      for (let i = 0; i < this.filteredTasks.length; i++) {
        let filteredTask = this.filteredTasks[i];
        if (task.id === filteredTask.id) {
          this.filteredTasks[i] = task;
          let itemIndex = this.tasks.findIndex(task => task.id == filteredTask.id);
          this.tasks[itemIndex] = task;
        }
      }
    }).catch(() => {
      this.toast.presentToast('Error editing task.');
    });
  }

  async deleteTask(id: string) {
    TASKS_ENDPOINT.doc(id).delete().then(() => {
      this.toast.presentToast('Task successfully deleted!');
      for (let i = 0; i < this.filteredTasks.length; i++) {
        const filteredTask = this.filteredTasks[i];
        if (id === filteredTask.id) {
          this.filteredTasks.splice(i, 1);
          this.tasks = this.tasks.filter(task => task.id != id);
        }
      }
    }).catch(() => {
      this.toast.presentToast('Error removing task.');
    });
  }

  async getTasks(column: string = 'title'): Promise<Task[]> {
    let tasksCollection = TASKS_ENDPOINT.orderBy(column.toLowerCase(), 'asc').get();
    return tasksCollection.then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        let data = doc.data() as Task;
        data.id = doc.id;
        data.created = doc.data().created.toDate();
        return data;
      });
    });
  }
}
