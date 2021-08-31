import { Router } from '@angular/router';

import { createReducer, on } from '@ngrx/store';
import * as locationActions from '../actions/locations.action';
import { Location } from '../../models/location.model'

export interface LocationsState {
    list: Location[]; 
}

export const initialState: LocationsState = {
    list : []
}

const _locationsReducer = createReducer(initialState,

    // GET LOCATIONS REDUCERS

    // Store remains as before
    on( locationActions.getLocations, state => ({ ...state })),

    // All locations are added to the store 
    on( locationActions.getLocationsSuccess, ( state, { list } ) => ({ ...state, list: [...list] })),

    // Store remains as before
    on( locationActions.getLocationsError, state => ({ ...state })),



    // DELETE LOCATION ACTIONS

    // Store remains as before
    on( locationActions.deleteLocation, state => ({ ...state })),

    // A location will be deleted from the store
    on(locationActions.deleteLocationSuccess, (state, { location }) => {
        const locations = [...state.list];
        locations.splice(locations.findIndex( (l : Location) => l.id === location.id), 1);
        return ({ ...state, list: locations })}),
        
    // Store remains as before
    on(locationActions.deleteLocationError, state => ({ ...state })),

    
    

    // EDIT LOCATION ACTIONS

    // Store remains as before
    on( locationActions.editLocation, state => ({ ...state })),

    // A location will be edited on the store
    on( locationActions.editLocationSuccess, ( state, { location } ) => {
        const locations = state.list.map( l => { 
            l.id === location.id ? l = {...location} : l;
            return l;
        });
        return {...state, list: locations};
    }),

    // Store remains as before
    on(locationActions.editLocationError, state => ({ ...state })),




    // ADD LOCATION ACTIONS

    // Store remains as before
    on( locationActions.addLocation, state => ({ ...state })),

    // A location will be added to the store
    on( locationActions.addLocationSuccess, (state, { location }) => {
        let locations: Location[] = [ ...state.list ];
        locations.push(location);
        return { ...state, locations: locations };
    }),

    // Store remains as before
    on( locationActions.addLocationError, state => ({ ...state }))

    
);

export function locationsReducer(state, action) {
    return _locationsReducer(state, action);
}