import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserMonthlyStats } from '../../../model/userMonthlyStats.model';
import { StatsService } from '../../../services/stats.service';
import { Chart } from 'chart.js/auto';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { StripeService } from '../../../services/stripe.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

@Component({
    selector: 'app-stats',
    standalone: true,
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css'],
    imports: [DashboardComponent,SocketIoModule]
})
export class StatsComponent implements OnInit {
  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueByEventChart', { static: true }) revenueByEventChartRef: ElementRef;
 
  lineChart!: Chart;
  chart!: Chart;
  totalRevenue:number=0;
  ticketsSold:number=0;
  currentMonth: string = '';
  visitCount:number=0;
  visits:number=0;
  pieChart: Chart<"pie", any[], any>;

  constructor(private statsService: StatsService,private stripeService:StripeService,private http:HttpClient) { }

  ngOnInit(): void {
    this.loadRevenueByEvent();
    this.getTicketSalesByEvent();
 this.getWeeklyTicketSales();
    this.incrementVisitCount();
    this.getVisitCount();
   this.currentMonth=this.getCurrentMonthName();
  this.statsService.getCountOfTicketsSoldForCurrentMonth().subscribe(
    (ticketsSold:number)=>{
      this.ticketsSold=ticketsSold;
      console.log("tickets sold",ticketsSold);
    },error=>{
      console.error("Failed to fetch tickets sold for current month",error);
    }
  )
    this.stripeService.getRevenue().subscribe(
      (revenue:any)=>{
        this.totalRevenue=revenue.available[0].amount;
        console.log(revenue);
      },error=>{
        console.error('Error fetching revenue',error);

      }

    );
    
    this.statsService.getUserStats().subscribe(
      (data: UserMonthlyStats[]) => {
        const monthNames = [
          'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
          'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'DecembrieS'
        ];
        const labels = data.map(stat => monthNames[new Date(stat.month).getMonth()]);
        const counts = data.map(stat => stat.userCount);
        this.chart = new Chart(this.chartRef.nativeElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'nr. de utilizatori ',
              data: counts,
             
              backgroundColor: 'rgba(77, 192, 192, 1)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: false,
            plugins: {
              datalabels: {
               
                formatter: (value) => `${value}`+" utilizatori",
                color: '#000',
                font: {
                  weight: 'bold'
                }
              },
              title: {
                display: true,
                text: 'Nr. de utilizatori noi in fiecare luna'
              },
            },
            scales: {
              x: {
                grid: {
                  display: true
                }
              },
              y: {
                grid: {
                  display: true
                }
              }
            }
          }
        });
      },
      error => {
        console.error('Failed to fetch user stats:', error);
      }
    );

    }
  
 
  getCurrentMonthName(): string {
    const monthNames = [
      'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
      'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
    ];
    const currentMonthIndex = new Date().getMonth();
    return monthNames[currentMonthIndex];
  }
  incrementVisitCount(): void {
    this.statsService.incrementVisitCount().subscribe(
      data => {
        console.log('Visit count incremented:', data);
      },
      error => {
        console.error('Failed to increment visit count:', error);
      }
    );
  }

  getVisitCount(): void {
    this.statsService.getVisitCount().subscribe(
      data => {
        this.visitCount = data;
        console.log(this.visitCount);
      },
      error => {
        console.error('Failed to fetch visit count:', error);
      }
    );
  }
  getWeeklyTicketSales(): void {
    this.statsService.getWeeklyTicketSales().subscribe(
      data => {
        const monthNames = [
          'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
      'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
        ];

        const labels = data.map((d: any[]) => `${monthNames[d[0] - 1]} - Week ${d[1]}`);
        const counts = data.map((d: any[]) => d[2]);

        this.lineChart = new Chart(this.lineChartRef.nativeElement, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'nr. de bilete',
              data: counts,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                grid: {
                  display: true
                }
              },
              y: {
                grid: {
                  display: true
                }
              }
            },
            plugins:{
              title: {
                display: true,
                text: 'Nr. de bilete vandute saptamanal'
              },
            }
          },
          
        });
      },
      error => {
        console.error('Failed to fetch weekly ticket sales:', error);
      }
    );
  }
  getTicketSalesByEvent(): void {
    this.statsService.getTicketSalesByEvent().subscribe(
      data => {
        const labels = data.map(d => d[0]);
        const counts = data.map(d => d[1]);

        this.pieChart = new Chart(this.pieChartRef.nativeElement, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Vanzari de bilete pe evenimente',
              data: counts,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: false,
            plugins: {
              datalabels: {
                
                formatter: (value) => `${value}`+" bilete",
                color: '#000',
                font: {
                  weight: 'bold'
                }
              },
              title: {
                display: true,
                text: 'Vanzari de bilete pe evenimente'
              },
            },
            
            
          }
        });
      },
      error => {
        console.error('Failed to fetch ticket sales by event:', error);
      }
    );
  }
  loadRevenueByEvent(): void {
    this.statsService.getRevenueByEvent().subscribe(
      data => {
        const labels = data.map((d: any[]) => d[0]);
        const revenue = data.map((d: any[]) => d[1] );

        new Chart(this.revenueByEventChartRef.nativeElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label:'venituri',
              data: revenue,
              backgroundColor: 'rgba(75, 192, 192,2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              
            }]
          },
          options: {
            responsive: false,
            plugins: {
              datalabels: {
                anchor: 'end',
                align: 'end',
                formatter: (value) => `${value}`+' Ron',
                color: '#000',
                font: {
                  weight: 'bold'
                }
              },
              title: {
                display: true,
                text: 'Venituri generate de fiecare eveniment'
              },
            },
            scales: {
              x: {
                grid: {
                  display: true
                }
              },
              y: {
                grid: {
                  display: true
                }
              }
            }
          }
        });
      },
      error => {
        console.error('Failed to fetch revenue by event:', error);
      }
    );
  }

}
