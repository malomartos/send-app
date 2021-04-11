import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from '../shared';



@NgModule({
  declarations: [
    Components.TableComponent,
    Components.PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Components.TableComponent,
    Components.PaginationComponent
  ]
})
export class SharedModule { }
