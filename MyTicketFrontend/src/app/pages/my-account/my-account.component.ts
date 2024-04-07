import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../model/userDto.model';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {

  userDto:UserDto;
  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo():void{
    console.log('started to retrieve user info');
    this.userService.getUserInfo().subscribe(
      (userDto:UserDto)=>{
        this.userDto=userDto;
        console.log('user info retrieved:',this.userDto);
      },
      (error)=>{
        console.error('Error retrieving user info:',error);
      }
    )
  }

}
