import { LocationFormComponent } from './location-form/location-form.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

    { path: ''        , component: LocationsListComponent },
    { path: 'edit/:id', component: LocationFormComponent },
    { path: 'add'     , component: LocationFormComponent } 
    
];



@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class LocationsRoutingModule { }