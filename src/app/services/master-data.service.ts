import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import * as firebase from 'firebase';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  public tasks: Task[] = [];
  public filteredTasks: Task[] | undefined;

  constructor(public toast: ToastService) { }

  createTask(task: Task) {
    firebase.firestore().collection('tasks').add({
      'title': task.title,
      'description': task.description,
      'completed': task.completed,
      'created': new Date()
    }).then((querySnapshot) => {
      querySnapshot.onSnapshot(doc => {
        if (doc.exists) {
          let data = doc.data() as Task;
          data.id = doc.id;
          data.created = doc.data().created.toDate();
          this.filteredTasks.push(data);
        }
      });
      this.toast.presentToast('Task successfully added.');
    }).catch(() => {
      this.toast.presentToast('Error creating task.');
    });
  }

  async getTask(id: string): Promise<Task> {
    return firebase.firestore().collection('tasks').doc(id).get().then(async doc => {
      if (doc.exists) {
        let data = doc.data() as Task;
        data.id = doc.id;
        return data;
      }
    });
  }

  async editTask(task: Task) {
    firebase.firestore().collection('tasks').doc(task.id).update(task).then(() => {
      this.toast.presentToast('Task successfully updated!');
      for (let i = 0; i < this.filteredTasks.length; i++) {
        let filteredTask = this.filteredTasks[i];
        if (task.id === filteredTask.id) {
          this.filteredTasks[i] = task;
        }
      }
    }).catch(() => {
      this.toast.presentToast('Error removing task.');
    });
  }

  async deleteTask(id: string) {
    firebase.firestore().collection('tasks').doc(id).delete().then(() => {
      this.toast.presentToast('Task successfully deleted!');
      for (let i = 0; i < this.filteredTasks.length; i++) {
        const filteredTask = this.filteredTasks[i];
        if (id === filteredTask.id) {
          this.filteredTasks.splice(i, 1);
        }
      }
    }).catch(() => {
      this.toast.presentToast('Error removing task.');
    });
  }

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
}
