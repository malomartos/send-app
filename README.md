# Exercise
1) Create a simple Angular CLI based application. 

 

2) Take the data provided (locations.json) and create the following features in the application:

- List view of data

- Add new item

- Edit existing item

- Delete item

 

3) Use NgRx to manage the location data in a store (in-memory) and all access/mutations to the data.

 

What we're looking for:

- Appropriate use of Angular and NgRx

- Clean and understandable code

- Something that hangs together - doesn't need to do everything on the list above

- Ability to talk through code and explain technical design decisions

# SendApp

## Modules

The app is divided in 3 modules:

### Home Module

This **lazy loaded** module only contains the welcome page of the app.

### Shared Module

- In this module we can find the **reusable** components that can be found on the app.
- These components follow the **presentational component pattern** (also known as 'dumb' components).
- They use the `onPush` change detection strategy to **improve the performance** of the app.

### Locations Module

In this module we can find the CRUD of locations, this module is also **lazily loaded**.

## NGRX

- There is a store for locations state management.
- The app has an **scalable architecture** for new `reducers`, `actions` and `effects`.

## SERVICES

There is only one service to get, edit and delete the locations.
All methods on this service also have a commented 'FAKE_URL' call in order to test how the app deal with http Errors.

## TOOLS AND AUXILIAR FRAMEWORKS

- Bootstrap for CSS and **responsive design**.
- SweetAlert2 for feedback modals.
