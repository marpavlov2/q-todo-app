import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase';
import { ToastService } from '../services/toast.service';
import { TaskPage } from './task/task.page';

firebase.initializeApp({
  apiKey: "AIzaSyBOv4hOeiB51_B9D7VcbNciBH_n9NdxS1c",
  authDomain: "q-todo-ap.firebaseapp.com",
  databaseURL: "https://q-todo-ap.firebaseio.com",
  projectId: "q-todo-ap",
  storageBucket: "q-todo-ap.appspot.com",
  messagingSenderId: "349471354485",
  appId: "1:349471354485:web:d8a0360c03fd46c59f123c",
  measurementId: "G-92F1XEXQWF"
});

@NgModule({
  declarations: [AppComponent, TaskPage],
  entryComponents: [TaskPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
