import { Location } from '../../models/location.model';
import { map, takeUntil } from 'rxjs/operators';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as locationActions from '../../store/actions/locations.action';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject();

  locationError;

  locationForm: FormGroup;

  locationFormSubmitted = false;

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

    this.activatedRoute.params.subscribe(params => {

      this.operationType = params['id'] ? 'edit' : 'add';

      this.store.select('locations')
        .pipe(

          takeUntil(this.onDestroy$),

          map( ({locations }) => ({ location: (locations.find((l) =>  (l.id.toString() === params['id'])))} ))

        ).subscribe(
          ({location}) => {

            if ( location ){

              this.locationForm.setValue({
                ...location,
                property_value:               this.currencyToNumber(location.property_value),
                business_interruption_value:  this.currencyToNumber( location.business_interruption_value)
              });

            }

          } 
        );

      
    });
  }

  ngOnDestroy(): void {

    this.onDestroy$.next();
    this.onDestroy$.complete();

  }

  cancelOperation() {

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
          this.router.navigate(['locations'])
        }
      });

    } else {

      this.router.navigate(['locations']);

    }
  }

  currencyToNumber( value: string ): number {
    return Number(value.slice(1));
  }

  addCurrency( value ): string {
    return '$'+value;
  }

  submitForm(){

    this.locationFormSubmitted = true;

    if(this.locationForm.invalid) return;

    let location = { ...this.locationForm.value } as Location;
    location = {
      ...location,
      property_value:               this.addCurrency(location.property_value),
      business_interruption_value:  this.addCurrency(location.business_interruption_value)
    };
    
    switch(this.operationType) {
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
