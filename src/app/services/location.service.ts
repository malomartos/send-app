import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor( private httpClient: HttpClient) { }


  getLocations() {
    return this.httpClient.get('../../assets/locations/locations.json')
  }

  deleteLocation() {
    return of(true);
  }

}
