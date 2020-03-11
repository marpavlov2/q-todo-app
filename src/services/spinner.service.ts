import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private loadingCtrl: LoadingController) { }

  async presentSpinner() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
  
    await loading.present();
  }

  async dismiss() {
    await this.loadingCtrl.dismiss();
  }
}
