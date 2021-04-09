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
                private locationService: LocationService) {}

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
    )

}