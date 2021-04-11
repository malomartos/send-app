import { Location } from '../../models/location.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as locationActions from '../../store/actions/locations.action'
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit, OnDestroy {

  locationsList: Location[] = [];

  constructor(  private store: Store<AppState>,
                private router: Router) { }

  onDestroy$ = new Subject<boolean>();


  //Table child component variables
  tableRows: Location[];
  rowsPerPage: number = 10;
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
  

  //Pagination child component variables
  activePage$ = new BehaviorSubject<number>(0);
  totalPages: number;



  ngOnInit(): void {
    
    this.store.select('locations')
      .pipe(
        takeUntil(this.onDestroy$),
        //filter( ({locations}) => locations.length !== 0)
      )
      .subscribe(
      ({ locations }) => {
          
          this.locationsList = locations;
          console.log(locations.length);
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


    this.activePage$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( () => {
        this.initTable();
        this.initPagination();
    })

  }

  ngOnDestroy(): void {

    this.onDestroy$.next(true);
    this.onDestroy$.complete();

  }

  initTable() {
    const startIndex = (this.activePage$.value * this.rowsPerPage);
    const endIndex = startIndex + this.rowsPerPage - 1;
    this.tableRows = this.locationsList.slice( startIndex, endIndex );
  }

  initPagination() {
    this.totalPages = Math.ceil(this.locationsList.length / this.rowsPerPage);
  }

  showLocationDetail(event) {
    console.log(event);
    
  }

  deleteLocation(location: Location): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this change!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(locationActions.deleteLocation({ location: location }))
        if (Math.ceil(this.locationsList.length / this.rowsPerPage) - 1 < this.activePage$.value){
          this.activePage$.next(Math.ceil(this.locationsList.length / this.rowsPerPage) - 1);
        }
        this.initTable();
        this.initPagination();
      }
    })
    
  }

  editLocation( location: Location ): void {
   this.router.navigate(['locations','edit', location.id]);
  }

  // Pagination child component methods
  updateActivePage(pageNum: number) {
    
    this.activePage$.next(pageNum);
  }


  addLocation() {
    this.router.navigate(['locations','add']);
  }
}