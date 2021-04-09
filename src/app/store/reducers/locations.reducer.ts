import { getLocations } from './../actions/locations.action';
import { createReducer, on } from '@ngrx/store';
import * as locationActions from '../actions/locations.action';

export interface LocationsState {
    locations: Location[]; 
    error    : any;
}

export const initialState: LocationsState = {
    locations : [],
    error: null
}

const _locationsReducer = createReducer(initialState,

    on( locationActions.getLocations, (state) => ({ ...state })),

    on( locationActions.getLocationsSuccess, (state, { locations }) => ({ ...state, locations: [...locations] })),

    on( locationActions.getLocationsError, (state, { payload }) => ({ ...state, error : { message: payload.message} })),

);

export function locationsReducer(state, action) {
    return _locationsReducer(state, action);
}