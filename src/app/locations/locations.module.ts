import { LocationFormComponent } from './location-form/location-form.component';
import { SharedModule } from './../shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LocationsListComponent, 
    LocationFormComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LocationsRoutingModule,
    SharedModule
  ]
})
export class LocationsModule { }
