import { Location } from './../../models/location.model';
import { createAction , props } from '@ngrx/store';


export const getLocations = createAction ('[Locations Component] getLocations');


export const getLocationsSuccess = createAction (
    '[Locations Component] getLocationsSuccess',
    props<{ locations: Location[] }>()
);

export const getLocationsError = createAction (
    '[Locations Component] getLocationsError',
    props<{ payload }>()
);


export const deleteLocation = createAction (
    '[Locations Component] Delete Location',
    props<{ location: Location }>()
);


export const deleteLocationError = createAction (
    '[Locations Component] Delete Location error',
    props<{ payload }>()
);


export const deleteLocationSuccess = createAction ( '[Locations Component] Delete Location success');


export const editLocation = createAction (
    '[Edit Locations Component] Edit Location',
    props<{location: Location}>()
);


export const editLocationSuccess = createAction ( '[Edit Locations Component] Edit Location success');


export const editLocationError = createAction (
    '[Edit Locations Component] Edit Location error',
    props<{ payload }>()
);



