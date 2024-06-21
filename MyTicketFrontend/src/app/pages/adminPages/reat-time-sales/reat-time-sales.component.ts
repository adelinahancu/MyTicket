import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { WebSocketService } from '../../../services/web-socket.service';
import { EventService } from '../../../services/event.service';
import { Eveniment } from '../../../model/eveniment.model';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-reat-time-sales',
  standalone: true,
  templateUrl: './reat-time-sales.component.html',
  styleUrls: ['./reat-time-sales.component.css'],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, DashboardComponent]
})
export class ReatTimeSalesComponent implements OnInit {
  displayedColumns: string[] = ['location', 'name', 'ticketsSold'];
  dataSource = new MatTableDataSource<Eveniment>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private webSocketService: WebSocketService, private eventService: EventService) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.sort.sort({ id: 'ticketsSold', start: 'desc', disableClear: false });
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data: Eveniment[]) => {
        this.dataSource.data = data;
        this.dataSource.data.forEach(event => {
          this.eventService.getTicketsSoldForEvent(event.id).subscribe({
            next: (ticketsSold: number) => {
              event.ticketsSold = ticketsSold;
              this.dataSource.data = [...this.dataSource.data]; // Refresh data source
            }
          });
          this.webSocketService.getTicketSalesUpdates(event.id).subscribe({
            next: (ticketsSold: number) => {
              this.updateTicketSalesData(event.id, ticketsSold);
            },
            error: (error: any) => {
              console.error('WebSocket error', error);
            }
          });
        });
      },
      error: (error: any) => {
        console.error('Error fetching events', error);
      }
    });
  }

  updateTicketSalesData(eventId: number, ticketsSold: number): void {
    const event = this.dataSource.data.find(e => e.id === eventId);
    if (event) {
      event.ticketsSold = ticketsSold;
      this.dataSource.data = [...this.dataSource.data]; // Refresh data source
    }
  }
}
