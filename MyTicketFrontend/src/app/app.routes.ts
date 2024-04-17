import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

import { MyAccountComponent } from './pages/my-account/my-account.component';
import { DashboardComponent } from './pages/adminPages/dashboard/dashboard.component';
import { AddLocationComponent } from './pages/adminPages/add-location/add-location.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { LocationLayoutComponent } from './pages/location-layout/location-layout.component';

export const routes: Routes = [
    { path:'login', component: LoginComponent },
    { path:'registration',component:RegistrationComponent },
    {path:'myaccount',component:MyAccountComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'addLocation',component:AddLocationComponent},
    {path:'locations',component:LocationsComponent},
    {path:"events",component:EventsComponent},
    {path:'events/:id',component:EventDetailsComponent},
    {path:'event/:eventId/location/:locationId',component:LocationLayoutComponent}
];
