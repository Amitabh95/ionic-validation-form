import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListPage } from '../list/list';
import { FormPage } from '../form/form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
dataPresentInStorage: boolean = true;
  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) {
    this.storage.get('DoctorAppointment').then((val) => {
      let temp = JSON.parse(val);
      console.log('parsed',temp);
      if(!(val === null || val === undefined)){
          this.dataPresentInStorage = false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  
  goToList(){
    this.navCtrl.push(ListPage);
  }

  goToForm(){
    this.navCtrl.push(FormPage);
  }
}