import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  finalDataWithArrayOfObjects: any[] = [];
  sampleArray: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  ionViewWillEnter(){
    this.storage.get('DoctorAppointment').then((val) => {
      let temp = JSON.parse(val);
      console.log('tempddd',temp);
        this.finalDataWithArrayOfObjects=[];
        temp.forEach((element) => {
          this.finalDataWithArrayOfObjects.push(JSON.stringify(element));
        });
        console.log('After pushing',this.finalDataWithArrayOfObjects);
        this.finalDataWithArrayOfObjects.forEach(element => {
          this.sampleArray.push(JSON.parse(element));
          console.log(typeof(JSON.parse(element)),this.sampleArray);
        });
      });
  }

}
