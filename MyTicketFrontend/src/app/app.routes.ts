import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AppComponent } from './app.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

export const routes: Routes = [
    { path:'login', component: LoginComponent },
    { path:'registration',component:RegistrationComponent },
    {path:'myaccount',component:MyAccountComponent}
];
