import { createAction, props } from '@ngrx/store';


export const getLocations = createAction('[Locations Component] getLocations');

export const getLocationsSuccess = createAction(
    '[Locations Component] getLocationsSuccess',
    props<{ locations: Location[] }>());

export const getLocationsError = createAction(
    '[Locations Component] getLocationsError',
    props<{ payload }>());