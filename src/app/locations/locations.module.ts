import { SharedModule } from './../shared/shared.module';
import { LocationsRoutingModule } from './locations-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LocationsComponent, EditComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LocationsRoutingModule,
    SharedModule
  ]
})
export class LocationsModule { }
