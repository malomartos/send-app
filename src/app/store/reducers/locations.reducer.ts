import Swal from 'sweetalert2'
import { createReducer, on } from '@ngrx/store';
import * as locationActions from '../actions/locations.action';
import { Location } from '../../models/location.model'

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

    on( locationActions.deleteLocation, (state, { id })=>{
        const locations = [...state.locations];
        locations.splice(locations.findIndex( (location: Location) => location.id === id), 1);
        return ({ ...state, locations: locations })}),

    on(locationActions.deleteLocationSuccess, (state,) => {
        Swal.fire(
            'Deleted!',
            'Your location has been deleted.',
            'success'
          );
        return {...state }}),
    
    on(locationActions.deleteLocationError, (state, { payload }) => ({...state, error: { message: payload.message} }))
);

export function locationsReducer(state, action) {
    return _locationsReducer(state, action);
}