import { Router } from '@angular/router';
import { Location } from './../../models/location.model';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import * as locationActions from '../actions/locations.action';
import { of, pipe } from 'rxjs';
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
                () => this.locationService.getLocations()
                .pipe(
                    map( locations => locationActions.getLocationsSuccess({locations: locations as Location[]})),
                    catchError( err => of(locationActions.getLocationsError({ payload: err })))
                )
            )
        )
    );

    deleteLocation$ = createEffect(
        () => this.actions$.pipe(
            ofType( locationActions.deleteLocation ),
            mergeMap(
                ( action ) => this.locationService.deleteLocation( action.location )
                .pipe(
                    map((location: Location) => locationActions.deleteLocationSuccess({location})),
                    tap(() => {
                        Swal.fire(
                        'Deleted!',
                        'Your location has been deleted.',
                        'success'
                      );}),
                      catchError( err => {
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

    editLocation$ = createEffect(
        () => this.actions$.pipe(
            ofType( locationActions.editLocation ),
            mergeMap(
                ( action ) => this.locationService.editLocation( action.location )
                .pipe(
                    map( (location: Location) => locationActions.editLocationSuccess({location}) ),
                    tap( () => {
                        Swal.fire(
                            'Edited!',
                            'Your location has been edited.',
                            'success'
                        );
                        this.router.navigate(['locations']);
                    }),
                    catchError( err => {
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
                    ( action ) => this.locationService.addLocation( action.location )
                    .pipe(
                        map( (location: Location) => locationActions.addLocationSuccess( {location} ) ),
                        tap( () => {
                            Swal.fire(
                                'Added!',
                                'Your location has been added.',
                                'success'
                            );
                            this.router.navigate(['locations']);
                        }),
                        catchError( err => {
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

}