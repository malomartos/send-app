import { Router } from '@angular/router';
import { Location } from './../../models/location.model';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import * as locationActions from '../actions/locations.action';
import { of } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class LocationsEffects {


    constructor(private actions$: Actions,
                private locationService: LocationService,
                private router: Router) {}

    
    getLocations$ = createEffect(
        () => this.actions$.pipe(
            ofType( locationActions.getLocations ),
            mergeMap(
                // Call to get the locations
                () => this.locationService.getLocations()
                .pipe(
                    // Will dispatch the getLocationsSuccess action
                    map( locations => locationActions.getLocationsSuccess({locations: locations as Location[]})),
                    // Will dispatch the getLocationsError action
                    catchError( err => of(locationActions.getLocationsError({ payload: err })))
                )
            )
        )
    );

    deleteLocation$ = createEffect(
        () => this.actions$.pipe(
            ofType( locationActions.deleteLocation ),
            mergeMap(
                // Call to delete a location
                ( action ) => this.locationService.deleteLocation( action.location )
                .pipe(
                    // Will dispatch deleteLocationSuccess action
                    map((location: Location) => locationActions.deleteLocationSuccess({location})),

                    // Will show a confirmation feedback modal
                    tap(() => {
                        Swal.fire(
                        'Deleted!',
                        'Your location has been deleted.',
                        'success'
                      );}),
                    // Will dispatch the editLocationError action
                    catchError( err => {
                        // Will show an error feedback modal
                        Swal.fire({
                            icon: 'error',
                            title: err.name,
                            text: err.message,
                            });
                    return of( locationActions.deleteLocationError({ payload: err }))
                    })
                )
            )
        )
    );

    editLocation$ = createEffect(
        () => this.actions$.pipe(
            ofType( locationActions.editLocation ),
            mergeMap(
                // Call to edit a location
                ( action ) => this.locationService.editLocation( action.location )
                .pipe(
                    // Will dispatch editLocationSuccess action
                    map( (location: Location) => locationActions.editLocationSuccess({location}) ),
                    // Will show a confirmation feedback modal
                    tap( () => {
                        Swal.fire(
                            'Edited!',
                            'Your location has been edited.',
                            'success'
                        );
                        // Will redirect to '/locations'
                        this.router.navigate(['locations']);
                    }),
                    // Will dispatch editLocationError action
                    catchError( err => {
                        // Will show an error feedback modal
                        Swal.fire({
                            icon: 'error',
                            title: err.name,
                            text: err.message,
                          });
                        return of( locationActions.editLocationError({ payload: err }))
                    })
                )
            )
        )
    );

    addLocation$ = createEffect(
        () => this.actions$.pipe(
                ofType(locationActions.addLocation),
                mergeMap(
                    // Call to add a location
                    ( action ) => this.locationService.addLocation( action.location )
                    .pipe(
                        // Will dispatch addLocationSuccess action
                        map( (location: Location) => locationActions.addLocationSuccess( {location} ) ),
                        // Will show a confirmation feedback modal
                        tap( () => {
                            Swal.fire(
                                'Added!',
                                'Your location has been added.',
                                'success'
                            );
                            this.router.navigate(['locations']);
                        }),
                        // Will dispatch addLocationError action
                        catchError( err => {
                            // Will show an error feedback modal
                            Swal.fire({
                                icon: 'error',
                                title: err.name,
                                text: err.message,
                              });
                            return of( locationActions.addLocationError({ payload: err }))
                        })
                    )
                )
            )
        );

}