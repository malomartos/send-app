import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as locationActions from '../store/actions/locations.action'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {

  locationsList: Location[] = [];

  constructor(  private store: Store<AppState>) { }

  onDestroy$ = new Subject<boolean>();

  ngOnInit(): void {
    

    this.store.select('locations')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
      ({ locations }) => {
          this.locationsList = locations;
          console.log(locations);
          
      }
    );

    this.store.dispatch(locationActions.getLocations());

  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  deleteLocation(event) {
    console.log(event);
    
  }

  editLocation( event ) {
    console.log(event);
  }

}
