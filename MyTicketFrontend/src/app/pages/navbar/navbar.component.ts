import { Component,ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user:User=new User();
  isNavbarExpanded=false;
  isClicked=false;
  @Output() navbarExpanded=new EventEmitter<boolean>();
  

  constructor(private userService:UserService,private router:Router,private elementRef: ElementRef){}



  handleClick(){
    this.isClicked=true;
  }
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    const isClickedOutside = !this.elementRef.nativeElement.contains(targetElement);

    if (isClickedOutside) {
      this.isClicked = false;
    }
  }
 
  getFirstName():string{
    if (this.isLoggedIn() && this.user.firstname) {
      return this.user.firstname;
    } else {
      return "User information or first name not available.";
    }
  }

  logout(event:Event){
    event.preventDefault();

    this.userService.logout().subscribe(
      response=>{
        console.log(response);
        localStorage.removeItem('access_token');
        
        this.router.navigate(['/login']);
    
      },
      error=>{
        console.error(error);
      }
    );
  }

  isLoggedIn():boolean{
    const token=localStorage.getItem('access_token');
    return token!=null;
  }

  

  toggleNavbar():void{
    this.isNavbarExpanded=!this.isNavbarExpanded;
    this.navbarExpanded.emit(this.isNavbarExpanded);
  }
 




}
