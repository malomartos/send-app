import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as locationActions from '../store/actions/locations.action'

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locationsList: Location[];

  constructor(  private store: Store<AppState>) { }

  ngOnInit(): void {
    

    this.store.select('locations').subscribe(
      ({locations}) => {
        this.locationsList = locations
        console.log(locations);
        
      }
    );

    this.store.dispatch(locationActions.getLocations());

  }

}
