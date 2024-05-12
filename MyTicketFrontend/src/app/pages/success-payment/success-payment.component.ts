import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-payment.component.html',
  styleUrl: './success-payment.component.css'
})
export class SuccessPaymentComponent implements OnInit{

  amount:number;
  loading:boolean;
  redirecting:boolean=false;
  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
    setTimeout(()=>{
      this.loading=false;
      setTimeout(()=>{this.redirecting=true;
      window.location.href='/events';},3000);
    },Math.floor(Math.random()*4000)+6000);
    this.amount=history.state.amount;
  }

}
