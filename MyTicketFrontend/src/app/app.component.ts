import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from "./pages/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, NavbarComponent, JwtModule, FooterComponent]
})
export class AppComponent {
  title = 'MyTicketFront';


}
