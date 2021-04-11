import { Router } from '@angular/router';

import { createReducer, on } from '@ngrx/store';
import * as locationActions from '../actions/locations.action';
import { Location } from '../../models/location.model'

export interface LocationsState {
    locations: Location[]; 
}

export const initialState: LocationsState = {
    locations : []
}

const _locationsReducer = createReducer(initialState,

    //Get locations reducers
    on( locationActions.getLocations, state => ({ ...state })),

    on( locationActions.getLocationsSuccess, ( state, { locations } ) => ({ ...state, locations: [...locations] })),

    on( locationActions.getLocationsError, state => ({ ...state })),


    //Delete location reducers
    on( locationActions.deleteLocation, state => ({ ...state })),

    on(locationActions.deleteLocationSuccess, (state, { location }) => {
        const locations = [...state.locations];
        locations.splice(locations.findIndex( (l : Location) => l.id === location.id), 1);
        return ({ ...state, locations: locations })}),
        
    on(locationActions.deleteLocationError, state => ({...state })),

    
    
    //Edit location reducers
    on( locationActions.editLocation, state => ({...state})),

    on( locationActions.editLocationSuccess, ( state, { location } ) => {
        const locations = state.locations.map( l => { 
            l.id === location.id ? l = {...location} : l;
            return l;
        });
        return {...state, locations: locations};
    }),

    on(locationActions.editLocationError, state => ({ ...state })),


    //Add location reducers
    on( locationActions.addLocation, state => ({ ...state })),

    on( locationActions.addLocationSuccess, (state, { location }) => {
        let locations: Location[] = [...state.locations];
        locations.push(location);
        return {...state, locations: locations };
    }),

    on( locationActions.addLocationError, state => ({...state }))

    
);

export function locationsReducer(state, action) {
    return _locationsReducer(state, action);
}