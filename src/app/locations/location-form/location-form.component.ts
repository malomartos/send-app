//Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//Models
import { Location } from '../../models/location.model';

//Rxjs
import { Subject } from 'rxjs';
import { tap, map, takeUntil, filter } from 'rxjs/operators';

//Ngrx
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as locationActions from '../../store/actions/locations.action';

//Tools
import Swal from 'sweetalert2';



//This component is used to edit or add a new Location, depending on the route
@Component({
  selector: 'app-edit',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit, OnDestroy {

  // Subject to manage the unsubscriptions
  onDestroy$ = new Subject();

  // Indicates if the locations have been previously fetched
  locationsCached = false;

  // Form to edit/add a location
  locationForm: FormGroup;

  // Indicates if the form have been submitted
  locationFormSubmitted = false;

  // Indicates the type of the operation
  operationType: 'edit' | 'add';

  constructor(  private activatedRoute: ActivatedRoute,
                private router:         Router,
                private store:          Store<AppState>) { 
  
    this.locationForm = new FormGroup({
      id:                           new FormControl('', [ Validators.required ]),
      lat:                          new FormControl('', [ Validators.required ]),
      lon:                          new FormControl('', [ Validators.required ]),
      address_line_1:               new FormControl('', [ Validators.required ]),
      city:                         new FormControl('', [ Validators.required ]),
      country:                      new FormControl('', [ Validators.required ]),
      property_value:               new FormControl('', [ Validators.required ]),
      business_interruption_value:  new FormControl('', [ Validators.required ]),

    });

  }


  ngOnInit(): void {
    // Subscription to the URL params to identify the type of operation. (no need to unsubscribe)
    this.activatedRoute.params.subscribe(params => {
      // We set the operationType based on the url params
      this.operationType = params['id'] ? 'edit' : 'add';
      // If we are editing a location then we subscribe to the store to get the location
      // based on the id route param 
        this.store.select('locations')
          .pipe(
            // It will unsubscribe on the next value for onDestroy$
            takeUntil(this.onDestroy$),
            // We set if the locations are or not already in memory
            tap( ({list}) => { 
              if(list.length) {
                this.locationsCached = true
              } else {
                this.locationsCached = false
              }}),
            // We return the location that matches with the id route param to proceed with it's edition.
            map( ({ list }) => list.find((l) =>  (l.id.toString() === params['id'])))
  
          ).subscribe(
            (location) => {
              if ( location ){
                //If the location exists then we set the values to the form.
                this.locationForm.setValue({
                  ...location,
                  property_value:               this.currencyToNumber(location.property_value),
                  business_interruption_value:  this.currencyToNumber( location.business_interruption_value)
                });
  
              }
             
  
            } 
          );

      // As the app don't use Guards (for simplicity) for the routing we need to get the locations
      // if the page was directly accessed
      if ( !this.locationsCached) {
        this.store.dispatch(locationActions.getLocations());
      }

      
    });
  }

  ngOnDestroy(): void {
    //We trigger the next value to unsubscribe all subcriptions
    this.onDestroy$.next();
    this.onDestroy$.complete();

  }

  cancelOperation() {

    //If the user made any change he will be alerted about losing his data when cancel.
    if ( !this.locationForm.pristine ) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You you will lose your data!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          // If the user confirmed to lose the data then is redirected to the locations list
          this.router.navigate(['locations'])
        }
      });

    } else {
      // If the user canceled wihout any change then is redirected to the locations list:
      this.router.navigate(['locations']);

    }
  }

  // It removes '$' simbol from a string and return a number.
  private currencyToNumber( value: string ): number {
    try {
      return Number(value.replace('$',''));
    } catch (error) {
      console.log('The string was not a valid number');
    }
  }

  // It adds the '$' simbol at the begining of a string.
  private addCurrency( value: string ): string {
    return '$'+value;
  }


  // Submit method for the form
  submitForm() {

    // We indicate that the form has been submitted to show the input validations
    this.locationFormSubmitted = true;
    // If the form is invalid then we do nothing.
    if ( this.locationForm.invalid ) return;

    // If the form was valid then we parse the values to a Location format
    let location = { ...this.locationForm.value } as Location;
    location = {
      ...location,
      property_value:               this.addCurrency(location.property_value),
      business_interruption_value:  this.addCurrency(location.business_interruption_value)
    };
    
    // Depending on the operation type we dispatch the action to the store
    switch ( this.operationType ) {
      case 'add':
        this.store.dispatch(locationActions.addLocation({location: location}));
        break;
      case 'edit':
        this.store.dispatch(locationActions.editLocation({ location: location }))
      default:
        break;
    }
  }

}
