import { EditComponent } from './edit/edit.component';
import { LocationsComponent } from './locations.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: ''    , component: LocationsComponent },
    { path: 'edit/:id', component: EditComponent }
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