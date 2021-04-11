import { LocationFormComponent } from './location-form/location-form.component';
import { LocationsComponent } from './locations.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: ''    , component: LocationsComponent },
    { path: 'edit/:id', component: LocationFormComponent },
    { path: 'add', component: LocationFormComponent }
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