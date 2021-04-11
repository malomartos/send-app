import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : 'locations' ,  loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule) },
  { path : 'home' ,       loadChildren: () => import('./home/home.module')          .then(m => m.HomeModule) },
  { path : '**' , pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
