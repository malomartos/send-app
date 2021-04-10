import { Location } from './../../models/location.model';
import { filter, map, merge, tap, takeUntil } from 'rxjs/operators';
import { AppState } from './../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  location: Location;

  onDestroy$ = new Subject();

  locationForm: FormGroup;

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

    })

  }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.store.select('locations')
      .pipe(
        takeUntil(this.onDestroy$),
        map(({locations}) => {
          console.log(locations);
          return locations.find((l) =>  {
            return l.id.toString() === params['id']
          })})
      ).subscribe(
        (location) => {
          if ( location ){
            this.locationForm.setValue({
              ...location
            })
          }
        } 
      )
      
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  cancelEdit() {
    this.router.navigate(['locations'])
  }

  editLocation(){
    console.log(this.locationForm.value);
    
  }

}
