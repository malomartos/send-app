import { addLocation, editLocation, getLocations } from './../../store/actions/locations.action';
import { LocationFormComponent } from './location-form.component';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { LocationsListComponent } from "../locations-list/locations-list.component";
import { AppState } from 'src/app/store/app.reducers';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { Store } from '@ngrx/store';
import {Location} from '@angular/common';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

fdescribe('LocationFormComponent', () => {
  
    let router: Router;
    let fixture: ComponentFixture<LocationFormComponent>;
    let component: LocationFormComponent;
    let store: MockStore<AppState>;
    let routeChangeSource = new Subject<Params>();
    const mockActivatedRoute = {
        params: routeChangeSource.asObservable()
      };

    const initialState: AppState = {
        locations: {
            list : [
                {"id":1,"lat":-21.35188,"lon":-46.4970116,"address_line_1":"21696 Independence Court","city":"Muzambinho","country":"Brazil","property_value":"$6442876.70","business_interruption_value":"$4981944.59"},
            ]
        }
    };



   
    beforeEach(async()=>{
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                provideMockStore({initialState}),
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
                
            ],
            declarations: [
                LocationFormComponent
            ]
        }).compileComponents();
    });

    beforeEach(() =>{
        router = TestBed.inject(Router);
        fixture = TestBed.createComponent(LocationFormComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        spyOn(store,'dispatch').and.callFake( () => {});
        fixture.detectChanges();
        
    })
        
   

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should redirect to Locations page on Cancel', () => {
        const spyRouter = spyOn(router,'navigate');
        component.cancelOperation();

        expect(spyRouter).toHaveBeenCalledWith(['locations'])
    });
    

    it('should dispatch editLocation action', () => {
        routeChangeSource.next({ id: '1' });
        
        component.submitForm();
        const locationForm =component.locationForm.value
        const location = {
            ...locationForm,
            property_value: '$'+locationForm.property_value,
            business_interruption_value: '$'+locationForm.business_interruption_value
        }
        expect(store.dispatch).toHaveBeenCalledWith(editLocation({location: location }))
    });

    it('should dispatch addLocation action', () => {
        routeChangeSource.next({ });
       
        component.locationForm.setValue({...initialState.locations.list[0]});
        const locationForm = component.locationForm.value;
        const location = {
            ...locationForm,
            property_value: '$'+locationForm.property_value,
            business_interruption_value: '$'+locationForm.business_interruption_value
        }
         component.submitForm();
        expect(store.dispatch).toHaveBeenCalledWith(addLocation({location: location }))
    });

    it('should dispatch getLocations action', fakeAsync(() => {
        store.setState({
            locations: {
                list : []
            }});
            store.refreshState();
            fixture.detectChanges();
            tick();
        routeChangeSource.next({ });
        expect(store.dispatch).toHaveBeenCalledWith(getLocations());
    }));
    
    
});