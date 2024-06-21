import { Component,CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../services/event.service';
import { HttpClient } from '@angular/common/http';
import { Eveniment } from '../../model/eveniment.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swiper from 'swiper';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent implements OnInit {
  events:Eveniment[]=[];
  currentSlide = 0;
  transform = '';
  cardWidth = 290;
  containerWidth: number;

  @ViewChild('slideContainer') slideContainer: ElementRef; 
  
  @ViewChild('carouselInner', { static: false }) carouselInner: ElementRef;

  constructor(private eventService: EventService){}


  ngOnInit() {
    this.getEvents();
  }
  ngAfterViewInit(): void {
    // Calculate and set the width of the carousel container
   this.carouselInner.nativeElement.style.width = `${this.events.length * (this.cardWidth + 10)}px`; // Add margin
  }
  getEvents() {
    this.eventService.getAllEvents()
      .subscribe(
        (events: Eveniment[]) => {
          this.events = events;
          console.log('Events fetched successfully:', this.events);
          console.log('Event image URLs:', this.events.map(event => event.imageUrl));
 // Log with success message
        },
        (error: any) => {
          console.error('Error fetching events:', error);
        }
      );
  }
  
  

  next(): void {
    if (this.currentSlide < this.events.length - 1) {
      this.currentSlide++;
    }
    this.getTransform();
  }

  prev(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
    this.getTransform();
  }

  getTransform(): string {
    return `translateX(-${this.currentSlide * this.cardWidth}px)`;
  }
}
