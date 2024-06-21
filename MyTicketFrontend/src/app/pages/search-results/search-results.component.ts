import { Component, OnInit } from '@angular/core';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Eveniment } from '../../model/eveniment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{
searchQuery:string='';
results:Eveniment[]=[];


constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
   this.results=history.state.searchResults;
   this.searchQuery=history.state.searchQuery;
  }

 

}
