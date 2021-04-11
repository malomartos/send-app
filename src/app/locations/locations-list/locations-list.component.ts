//Angular
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { Location } from '../../models/location.model';

//Ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as locationActions from '../../store/actions/locations.action'

//Rxjs
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//Tools
import Swal from 'sweetalert2'

//This is the 'smart' component than controls the list of Locations
@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit, OnDestroy {

  //Array with all the locations coming from the store
  locationsList: Location[] = [];

  // Subject to manage the unsubscriptions
  onDestroy$ = new Subject<boolean>();


  // Table child component variables

  // Array with the locations to be shown on the table child component
  tableRows: Location[];

  // Number of locations per page we want to show
  rowsPerPage: number = 10;

  // Columns alias to use on the table
  tableColumns = [
    'ID', 
    'Latitude', 
    'Longitude',
    'Address',
    'City',
    'Country',
    'P. Value',
    'B.I Value'
  ]
  

  // Pagination child component variables

  // Subject of the current active page of the pagination
  activePage$ = new BehaviorSubject<number>(0);

  // Total number of pages on the pagination
  totalPages: number;



  constructor(  private store: Store<AppState>,
                private router: Router) { }


  ngOnInit(): void {
    
    // Subscription to get the locations from the store
    this.store.select('locations')
      .pipe(
        // It will unsubscribe on the next value for onDestroy$
        takeUntil(this.onDestroy$),
      )
      .subscribe(
      ({ locations }) => {
          
          // We store the locations 
          this.locationsList = locations;
          
          // We set the correct values for the child components
          this.initTable();
          this.initPagination();
      }
    );

    // If we have retrieved the locations before then we don't
    // retrieve them again in order to see edit and delete changes.
    // (This is because we are not working with a real server to keep the changes)
    if( this.locationsList.length === 0 ){
      this.store.dispatch(locationActions.getLocations());
    }

    // Subscription to activePage$ in order to update the child components 
    this.activePage$
      // It will unsubscribe on the next value for onDestroy$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( () => {
        this.initTable();
        this.initPagination();
    })

  }

  ngOnDestroy(): void {
    //We trigger the next value to unsubscribe all subcriptions.
    this.onDestroy$.next(true);
    this.onDestroy$.complete();

  }

  // It calculates the rows to show on the table
  initTable() {
    const startIndex = (this.activePage$.value * this.rowsPerPage);
    const endIndex = startIndex + this.rowsPerPage - 1;
    this.tableRows = this.locationsList.slice( startIndex, endIndex );
  }

  // It calculates the total number of pages for the pagination
  initPagination() {
    this.totalPages = Math.ceil(this.locationsList.length / this.rowsPerPage);
  }

  // Method to manage the delete eventEmitter from the table component
  deleteLocation(location: Location): void {
    
    // We ask for confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this change!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if ( result.isConfirmed ) {
        // If the user confirmed then we dispatch the delete action
        this.store.dispatch(locationActions.deleteLocation({ location: location }));

        // If the location deleted was the last of the last page 
        // then the number of totalPages will change and we need to update the active page
        if (Math.ceil(this.locationsList.length / this.rowsPerPage) - 1 < this.activePage$.value){
          this.activePage$.next(Math.ceil(this.locationsList.length / this.rowsPerPage) - 1);
        }
        
        // Update the child components after deletion.
        this.initTable();
        this.initPagination();
      }
    })
    
  }

  // Method to manage the edit eventEmitter from the table component
  editLocation( location: Location ): void {

   this.router.navigate(['locations','edit', location.id]);

  }

  
  // Method to manage the pagination eventEmitter from the pagination component
  updateActivePage(pageNum: number) {
    
    this.activePage$.next(pageNum);

  }


  // Method for click event on the 'Add' button
  addLocation() {

    // Redirection to the addition page.
    this.router.navigate(['locations','add']);

  }
}
