import { LocationsListComponent } from './../locations/locations-list/locations-list.component';
import { AppComponent } from './../app.component';
import { HomeComponent } from './home.component';
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {Location} from '@angular/common';

describe('HomeComponent', () => {

    let router: Router;
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let location: Location;

    beforeEach( ()=>{

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'locations', component: LocationsListComponent }
                   ])],
            declarations: [
                HomeComponent
            ]
        }).compileComponents();

            router = TestBed.inject(Router);
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            location = TestBed.inject(Location);
            fixture.detectChanges();
       


    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    })

    it('should navigate to LocationslistComponent when clicked on Start button', fakeAsync(() => {
        const link = fixture.debugElement.query(By.css('a')).nativeElement;
        link.click();
        tick();
        expect(location.path()).toBe('/locations');
    }));


});