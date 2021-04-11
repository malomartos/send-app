import { Location } from './../../models/location.model';
import { createAction , props } from '@ngrx/store';



// Get locations actions


export const getLocations = createAction ('[Locations Component] getLocations');


export const getLocationsSuccess = createAction (
    '[Locations Component] getLocationsSuccess',
    props<{ locations: Location[] }>()
);

export const getLocationsError = createAction (
    '[Locations Component] getLocationsError',
    props<{ payload: any }>()
);



// Delete location actions

export const deleteLocation = createAction (
    '[Locations Component] Delete Location',
    props<{location: Location}>());

export const deleteLocationError = createAction (
    '[Locations Component] Delete Location error',
    props<{ payload }>()
);

export const deleteLocationSuccess = createAction ( 
    '[Locations Component] Delete Location success',
    props<{ location: Location }>()
);



// Edit location actions

export const editLocation = createAction (
    '[Location Form Component] Edit Location',
    props<{location: Location}>()
);
export const editLocationSuccess = createAction ( 
    '[Location Form Component] Edit Location success',
    props<{location: Location}>());

export const editLocationError = createAction (
    '[Location Form Component] Edit Location error',
    props<{ payload }>()
);



//Add location actions

export const addLocation = createAction (
    '[Location Form Component] Add Location',
    props<{location: Location}>()
);

export const addLocationSuccess = createAction (
    '[[Location Form Component] Add Location Success]',
    props<{location: Location}>());

export const addLocationError = createAction (
    '[[Location Form Component] Add Location Error]',
    props<{ payload }>()
);



