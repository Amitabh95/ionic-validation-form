import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the CountryCodeExtractorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryCodeExtractorProvider {
  private _url = '../assets/data.json';

  constructor(private http: HttpClient) { }

  getcountry() {
    return this.http.get<any>(this._url);
  }
}