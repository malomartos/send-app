import { PaginationComponent } from './../../shared/pagination/pagination.component';
import { TableComponent } from './../../shared/table/table.component';
import { AppState } from './../../store/app.reducers';
import { By } from '@angular/platform-browser';
import { LocationsListComponent } from './locations-list.component';
import { Router } from "@angular/router";
import { ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {Location} from '@angular/common';
import Swal from 'sweetalert2'
import * as locationActions from '../../store/actions/locations.action'

describe('LocationsListComponent', () => {

    let router: Router;
    let fixture: ComponentFixture<LocationsListComponent>;
    let component: LocationsListComponent;
    let location: Location;
    let store: MockStore;

    const initialState: AppState = {
        locations: {
            list : [
                {"id":1,"lat":-21.35188,"lon":-46.4970116,"address_line_1":"21696 Independence Court","city":"Muzambinho","country":"Brazil","property_value":"$6442876.70","business_interruption_value":"$4981944.59"},
                {"id":2,"lat":46.280212,"lon":-0.4601725,"address_line_1":"186 Nevada Plaza","city":"Lens","country":"France","property_value":"$18749425.31","business_interruption_value":"$9099745.90"},
                {"id":3,"lat":42.280524,"lon":118.928688,"address_line_1":"7 Esker Alley","city":"Nizui","country":"China","property_value":"$6878641.75","business_interruption_value":"$15122793.81"},
                {"id":4,"lat":46.7530428,"lon":-71.2196569,"address_line_1":"9 Independence Plaza","city":"Québec","country":"Canada","property_value":"$3737854.51","business_interruption_value":"$9251298.17"}
            ]}};


    beforeEach( ()=>{

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                provideMockStore({initialState})
            ],
            declarations: [
                LocationsListComponent,
                TableComponent,
                PaginationComponent
            ]
        }).compileComponents();

            router = TestBed.inject(Router);
            fixture = TestBed.createComponent(LocationsListComponent);
            component = fixture.componentInstance;
            location = TestBed.inject(Location);
            fixture.detectChanges();
            store = TestBed.inject(MockStore);
            spyOn(store, 'dispatch').and.callFake(() => {});


    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });
    

    it('should show the table of locations', () => {
        // fixture.detectChanges();
        const rows = fixture.debugElement.queryAll(By.css('tr'));
        
        expect(component.locationsList.length).toBe(4);
        expect(rows.length).toBe(5);
    });

    it('should set the table pagination correctly', () => {
        const pages = fixture.debugElement.queryAll(By.css('.page-item'));
        
        expect(pages.length).toBe(5);
    });

    it('should redirect to Add page', () => {
        const spyRouter = spyOn(router, 'navigate');

        const addLocationButton = fixture.debugElement.query(By.css('#addLocationButton')).nativeElement;
        addLocationButton.click();

        expect(spyRouter).toHaveBeenCalledWith(['locations','add']);

    });

    it('should redirect to Edit location', () => {
        const spyRouter = spyOn(router, 'navigate');
        const firstEditLocationButton = fixture.debugElement.queryAll(By.css('.editButton'))[0].nativeElement;

        firstEditLocationButton.click();

        expect(spyRouter).toHaveBeenCalledWith(['locations','edit', 1]);

    });

    it('should ask before remove an element', () => {
        const firstDeleteLocationButton = fixture.debugElement.queryAll(By.css('.deleteButton'))[0].nativeElement;
        firstDeleteLocationButton.click();

        expect(Swal.isVisible()).toBeTruthy();

    });

    it('should dispatch DeleteLocation Action', fakeAsync(() => {
        const spySwal = spyOn(Swal,'fire')
                        .and.resolveTo({    value: null,
                                            isConfirmed: true,
                                            isDenied: false,
                                            isDismissed: false
                                        });

        component.deleteLocation(initialState.locations[0]);
        flushMicrotasks();

        expect(spySwal).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(locationActions.deleteLocation({location: initialState.locations[0]}));

    }));
    
    
});