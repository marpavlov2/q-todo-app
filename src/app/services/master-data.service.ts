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
        let data = doc.data() as Task;
        data.id = doc.id;
        data.created = doc.data().created.toDate();
        this.filteredTasks.push(data);
      })
    }).catch(err => {
      console.log('Error');
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

  async deleteTask(id: string) {
    firebase.firestore().collection('tasks').doc(id).delete().then(() => {
      this.toast.presentToast('Task successfully deleted!');
      for (let i = 0; i < this.filteredTasks.length; i++) {
        const element = this.filteredTasks[i];
        if (id === element.id) {
          this.filteredTasks.splice(i, 1);
        }
      }
    }).catch((error) => {
      this.toast.presentToast('Task successfully deleted!');
      console.error("Error removing task: ", error);
    });
  }
}
