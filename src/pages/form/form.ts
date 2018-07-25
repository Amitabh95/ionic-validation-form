import { Component,  } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import 'rxjs/add/operator/debounceTime';
import { CountryCodeExtractorProvider } from '../../providers/country-code-extractor/country-code-extractor';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  searchControl: FormControl
  public validationForm: FormGroup;
  eventFromAgeDob:boolean = false;
  //Country list
  Countrylist: any[] = [];
  flag = true;
  countryName;
  filteredList;
  countryCode;
  searchTerm: string = '';
  items;
  search: boolean = false;
  searching: boolean = false;

  passwordType: string;
  showHidePasswordIcon: string;
  selectedDate: string;
  currentAge;
  passwordValue;
  repeatPasswordState: boolean = false;
  error='';
  confirmPasswordValue='';
  errorArray: any[] = [];
  ageValueFromField;
  dobValue;
  currentTime: string;
  submitDisabled: boolean = false;

  finalData: any;
  finalDataWithArrayOfObjects:any[] = [];
  
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private country: CountryCodeExtractorProvider,
    private storage: Storage
  ) {
    
    this.searchControl = new FormControl();
    this.validationForm = this.formBuilder.group({
      firstName: new FormControl ('', [Validators.required]),
      lastName: new FormControl (''),
      age: new FormControl ('',Validators.pattern('^[1-9][0-9]?$')), //'^([1-9]?[0-9]?[0-9]|1[01][0-9]|12[0])$'
      dob: new FormControl (''),
      email: new FormControl ('',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl ('',[Validators.required,Validators.maxLength(16),Validators.minLength(8)]),
      repeatPassword: new FormControl ('',[Validators.required]),
      countryCode: new FormControl ('',[Validators.required]),
      phoneNo: new FormControl ('',[Validators.required]),
      registeringFor: new FormControl ('',[Validators.required]),
      symptoms: new FormControl ('',[Validators.required])
    });
    
  }
  
  ngOnInit() {
    this.Api();
    this.passwordType = 'password';
    this.showHidePasswordIcon = 'eye-off';
  } 
  ionViewDidLoad(){
  }
  password(event){
    this.passwordValue = event._value;
  }

  confirmPassword(event){
    this.confirmPasswordValue = event._value;
    if(this.passwordValue === this.confirmPasswordValue){
      this.error = 'Password Matched';
    } else if (this.passwordValue !== this.confirmPasswordValue){
      this.error = 'Password Not Matched';
    }

  }

  presentAlert() {
    let alert = this.alertController.create({
      title: 'Success',
      subTitle: 'Your booking has been confirmed!!',
      buttons: ['Okay']
    });
    alert.present();
  }

  Api() {
    this.country.getcountry()
      .subscribe (
        (res) => {
          this.Countrylist = res;
          console.log(res);
        },
        err => console.log(err)
      );
  }

  submit(){
    this.submitDisabled = true;
    this.errorArray = [];
    if(this.validationForm.controls.firstName.invalid){
      this.errorArray.push('Please provide your First Name');
    } 
    
    if(this.eventFromAgeDob === true){
      if(this.ageValueFromField === null || this.ageValueFromField === undefined){
        this.errorArray.push('Please provide your age');
      }
    } 
    
    if (this.eventFromAgeDob === false){
      if(this.dobValue === null || this.dobValue === undefined){
        this.errorArray.push('Please provide your dob');
      }
    } 
    
    if (this.validationForm.controls.email.invalid){
      this.errorArray.push('Please provide your email');
    }
    
    if(this.validationForm.controls.password.invalid){
      this.errorArray.push('Please set your password');
    }
    if(!this.validationForm.controls.repeatPassword.invalid){
        if(this.passwordValue !== this.confirmPasswordValue){
          this.errorArray.push('Password mismatched');
        }
    }
    if(this.validationForm.controls.countryCode.invalid){
      this.errorArray.push('Please select country code');
    }
    if(this.validationForm.controls.phoneNo.invalid){
      this.errorArray.push('Please select phone number');
    }

    if(this.validationForm.controls.registeringFor.invalid){
      this.errorArray.push('Please select for whom you are registering for');

    }

    if(this.validationForm.controls.symptoms.invalid){
      this.errorArray.push('Please select the symptoms.');

    }

    if(this.errorArray.length === 0){
      if(this.eventFromAgeDob === true){
        this.saveData('age');
      } 
      else{
        this.saveData('dob');
      }
    }
    this.submitDisabled = false;
    //console.log(this.errorArray);
  }

  saveData(ageOrDob){
    this.currentTime =moment().format('DD/MM/YYYY, h:mm:ss a');
    if(ageOrDob === 'age'){
      this.finalData = [
        {
            currentTime: this.currentTime,
            firstName: this.validationForm.controls.firstName.value,
            lastName: this.validationForm.controls.lastName.value,
            isDOB: false,
            dob: null,
            isAge: true,
            age: this.validationForm.controls.age.value,
            email: this.validationForm.controls.email.value,
            password: this.validationForm.controls.password.value,
            countryCode: this.validationForm.controls.countryCode.value,
            phoneNo: this.validationForm.controls.phoneNo.value,
            registeringFor: this.validationForm.controls.registeringFor.value,
            symptoms: this.validationForm.controls.symptoms.value,
      }
    ];
    } else if(ageOrDob === 'dob'){
      this.finalData = [
        {
          currentTime: this.currentTime,
          firstName: this.validationForm.controls.firstName.value,
          lastName: this.validationForm.controls.lastName.value,
          isDOB: true,
          dob: this.validationForm.controls.dob.value,
          isAge: false,
          age: null,
          email: this.validationForm.controls.email.value,
          password: this.validationForm.controls.password.value,
          countryCode: this.validationForm.controls.countryCode.value,
          phoneNo: this.validationForm.controls.phoneNo.value,
          registeringFor: this.validationForm.controls.registeringFor.value,
          symptoms: this.validationForm.controls.symptoms.value,
      }
    ];
    }
    this.storage.get('DoctorAppointment').then((val) => {
      let temp = JSON.parse(val);
      console.log('parsed',temp);
      if(!(temp === null || temp === undefined)){
        this.storage.remove('DoctorAppointment');
        this.finalDataWithArrayOfObjects=[];
        temp.forEach((element) => {
          console.log('element-->',element);
          this.finalDataWithArrayOfObjects.push(element);
        });
        
        this.finalDataWithArrayOfObjects.push(this.finalData[0]);
        console.log('After pushing',this.finalDataWithArrayOfObjects);
        this.storage.set('DoctorAppointment',JSON.stringify(this.finalDataWithArrayOfObjects));
      }
      else {
        this.storage.set('DoctorAppointment',JSON.stringify(this.finalData));
      }
      });
      this.presentAlert();
      //this.navCtrl.pop();
  }

  

  ageValue(event){
    this.ageValueFromField = event._value;
  }

  togglePasswordType(){
    let type = this.passwordType;
    if(type === 'text'){
      this.passwordType = 'password';
      this.showHidePasswordIcon = 'eye-off';
    } else if(type === 'password'){
      this.passwordType = 'text';
      this.showHidePasswordIcon = 'eye';
      
    }
  }
/*
  showCountry() {
    this.countryName = this.validationForm.controls.countryname.value;
    if (this.countryName.trim() === '') {
    this.flag = true;
    } else {
      this.flag = false;
      this.filteredList = this.Countrylist
      .filter(country => country.name.includes(this.countryName) || country.callingCodes.includes(this.countryName));
    }
  }

  getCountry(html: string) {
    this.countryCode = html.split(' ')[5];
    this.flag = true;
  }
  */
  maxDate(): string{
    return moment().subtract(18, 'year').format('YYYY-MM-DD');
    //console.log(moment().subtract(18, 'year').format('YYYY-MM-DD'));
  }
  calculateAge(){
    this.selectedDate = moment().format('DD/MM/YYYY');
   // return moment.preciseDiff(this.selectedDate, currentDate);
  }

  ageDob(event){
    this.eventFromAgeDob = event.checked;
    console.log(this.eventFromAgeDob);
    console.log('data',this.finalData);
    console.log('error',this.errorArray);
  }

  symptoms(event){
    console.log(event);
  }
  registeringFor(event){
    console.log(event);
  }

  returnDOB(event){
    this.dobValue = event.day + '/'+ event.month +'/'+ event.year;
    let selectedDateYear = event.year;
    let currentDate = new Date();
    let currentDateYear = currentDate.getFullYear();
    this.currentAge = currentDateYear - selectedDateYear;
  }


  onSearchInput(){
    this.search = true;
    this.searching = true;
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
            this.searching = false;
            this.setFilteredItems();
    });
}


setFilteredItems() {
    this.items = this.filterItems(this.searchTerm);
}

filterItems(searchTerm){
  let temp =this.Countrylist;
 
  return temp.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  });    

}

}
