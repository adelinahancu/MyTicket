import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private unsubcribe$: Subject<void> = new Subject();
  private subscriptions: Map<number, StompSubscription> = new Map();
  private connectionPromise: Promise<void>;
  constructor() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {},
      debug: function (str) {
        console.log(str);
      }
    });
    
    this.stompClient.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/ws', null, { reconnectDelay: -1, });
    };

    this.connectionPromise = new Promise((resolve, reject) => {
      this.stompClient.onConnect = (frame) => {
        console.log('Connected to websocketServer');
        resolve();
      };

      this.stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        reject(new Error('STOMP error'));
      };

      this.stompClient.activate();
    });
    this.connectionPromise
      .then(() => console.log('WebSocket connection established')) // Log success
      .catch(error => console.error('Failed to connect to WebSocket server:', error)); // Log failure
    this.stompClient.configure({
      heartbeatIncoming: 0, // Disable incoming heartbeats
      heartbeatOutgoing: 0,
      reconnectDelay: -1,// Disable outgoing heartbeats
    });
  }


  getTicketSalesUpdates(eventId: number): Observable<number> {
    console.log('getTicketSalesUpdates called with eventId:', eventId);
    return new Observable(observer => {
      console.log('Inside getTicketSalesUpdates connectionPromise');
      this.connectionPromise.then(() => {
        console.log('Connection promise resolved');
        const subscription = this.stompClient.subscribe(
          `/topic/ticketSalesUpdates/${eventId}`,
          message => {
            const body = JSON.parse(message.body);
            observer.next(body.ticketsSold);
          }
        );
        this.subscriptions.set(eventId, subscription);

        return {
          unsubscribe: () => {
            const subscription = this.subscriptions.get(eventId);
            if (subscription) {
              subscription.unsubscribe();
              this.subscriptions.delete(eventId);
            }
          }
        };
      }).catch(error => {
        console.error("Connection promise rejected with error:", error);
        observer.error(error);
      });
    });
  }


}





