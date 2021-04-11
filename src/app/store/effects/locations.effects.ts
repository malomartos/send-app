import { Router } from '@angular/router';
import { Location } from './../../models/location.model';
import { LocationService } from './../../services/location.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import * as locationActions from '../actions/locations.action';
import { of } from 'rxjs';

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
                    catchError( err => of(locationActions.getLocationsError({payload: err})))
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
                    map(resp => locationActions.deleteLocationSuccess()),
                    catchError( err => of(locationActions.deleteLocationError({payload: err})))
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
                    map( resp => locationActions.deleteLocationSuccess() ),
                    tap( () => this.router.navigate(['locations'])),
                    catchError( err => of( locationActions.editLocationError({payload: err})))
                )
            )
        )
    )

}