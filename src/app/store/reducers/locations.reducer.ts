import { getLocations } from './../actions/locations.action';
import { createReducer, on } from '@ngrx/store';
import * as locationActions from '../actions/locations.action';

export interface LocationsState {
    locations: Location[]; 
}

export const initialState: LocationsState = {
    locations : [] 
}

const _locationsReducer = createReducer(initialState,

    on( locationActions.getLocations, (state) => ({ ...state })),

);

export function locationsReducer(state, action) {
    return _locationsReducer(state, action);
}