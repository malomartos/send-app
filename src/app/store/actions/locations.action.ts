import { Location } from './../../models/location.model';
import { createAction , props } from '@ngrx/store';



// GET LOCATIONS ACTIONS

// Action to dispatch to get the locations
export const getLocations = createAction ('[Locations Component] getLocations');

// Action to dispatch when the fetch of locations was successful
export const getLocationsSuccess = createAction (
    '[Locations Component] getLocationsSuccess',
    props<{ locations: Location[] }>()
);

// Action to dispatch when the fecth of locations failed
export const getLocationsError = createAction (
    '[Locations Component] getLocationsError',
    props<{ payload: any }>()
);



// DELETE LOCATION ACTIONS

// Action to dispatch to delete a location
export const deleteLocation = createAction (
    '[Locations Component] Delete Location',
    props<{location: Location}>()
);

// Action to dispatch when the location deletion was successful
export const deleteLocationSuccess = createAction ( 
    '[Locations Component] Delete Location success',
    props<{ location: Location }>()
);

// Action to dispatch when the location deletion failed
export const deleteLocationError = createAction (
    '[Locations Component] Delete Location error',
    props<{ payload: any }>()
);




// EDIT LOCATION ACTIONS

// Action to dispatch to edit a location
export const editLocation = createAction (
    '[Location Form Component] Edit Location',
    props<{location: Location}>()
);

// Action to dispatch when the location edition was successful
export const editLocationSuccess = createAction ( 
    '[Location Form Component] Edit Location success',
    props<{location: Location}>());

// Action to dispatch when the location edition failed
export const editLocationError = createAction (
    '[Location Form Component] Edit Location error',
    props<{ payload: any }>()
);



//ADD LOCATION ACTIONS

// Action to dispatch to add a location
export const addLocation = createAction (
    '[Location Form Component] Add Location',
    props<{location: Location}>()
);

// Action to dispatch when the location addition was successful
export const addLocationSuccess = createAction (
    '[[Location Form Component] Add Location Success]',
    props<{location: Location}>());

// Action to dispatch when the location addition failed
export const addLocationError = createAction (
    '[[Location Form Component] Add Location Error]',
    props<{ payload }>()
);



