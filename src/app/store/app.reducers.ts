import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {

   locations: reducers.LocationsState
   
}



export const appReducers: ActionReducerMap<AppState> = {

    locations: reducers.locationsReducer

}