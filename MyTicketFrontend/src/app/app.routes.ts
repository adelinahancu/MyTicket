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
import { PaymentComponent } from './pages/payment/payment.component';
import { SuccessPaymentComponent } from './pages/success-payment/success-payment.component';
import { StatsComponent } from './pages/adminPages/stats/stats.component';
import { AdminEventsComponent } from './pages/adminPages/admin-events/admin-events.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { adminGuard } from './guards/admin.guard';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ReatTimeSalesComponent } from './pages/adminPages/reat-time-sales/reat-time-sales.component';


export const routes: Routes = [
    { path:'login', component: LoginComponent },
    { path:'registration',component:RegistrationComponent },
    {path:'myaccount',component:MyAccountComponent},
    {path:'dashboard',component:DashboardComponent,canActivate:[adminGuard]},
    {path:'addLocation',component:AddLocationComponent,canActivate:[adminGuard]},
    {path:'locations',component:LocationsComponent},
    {path:"events",component:EventsComponent},
    {path:'events/:id',component:EventDetailsComponent},
    {path:'event/:eventId/location/:locationId',component:LocationLayoutComponent},
    {path:'payment',component:PaymentComponent},
    {path:'successPayment',component:SuccessPaymentComponent},
    {path:'stats',component:StatsComponent,canActivate:[adminGuard]},
    {path:'addEvent',component:AdminEventsComponent,canActivate:[adminGuard]},
    {path:'home',component:HomePageComponent},
    {path:'search-results',component:SearchResultsComponent},
    {path:"sales-dashboard",component:ReatTimeSalesComponent}
   
   
 
];
