import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient  } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CountryCodeExtractorProvider } from '../providers/country-code-extractor/country-code-extractor';
import { IonicStorageModule } from '@ionic/storage';
import { FormPage } from '../pages/form/form';
import { ListPage } from '../pages/list/list';
import { ModalPage } from '../pages/modal/modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormPage,
    ListPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormPage,
    ListPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CountryCodeExtractorProvider,
    HttpClient
    
  ]
})
export class AppModule {}
