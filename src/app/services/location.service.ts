import { map } from 'rxjs/operators';
import { Location } from './../models/location.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor( private httpClient: HttpClient) { }


  getLocations(): Observable<Location[]> {

    return this.httpClient.get('../../assets/locations/locations.json')
                          .pipe(
                            map( locations => locations as Location[])
                          );

    // return this.httpClient.get('MOCK_URL');
  }

  deleteLocation(location: Location) {
    
    return of(location); // A real server would return the location deleted
    
    // return this.httpClient.get('FAKE_URL');
  }

  editLocation(location: Location) {
    
    return of(location); // A real server would return the location edited

    // return this.httpClient.get('FAKE_URL');
  }

  addLocation( location: Location ) {

    return of(location); // A real server would return the location added

    // return this.httpClient.get('FAKE_URL');
  }

}
