import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteEventsService {
  private favoriteEventIdsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public favoriteEventIds$: Observable<number[]> = this.favoriteEventIdsSubject.asObservable();

  constructor() {}

  getFavoriteEventIds(): number[] {
    return this.favoriteEventIdsSubject.getValue();
  }

  setFavoriteEventIds(ids: number[]): void {
    this.favoriteEventIdsSubject.next(ids);
  }

  addFavoriteEventId(id: number): void {
    const currentIds = this.getFavoriteEventIds();
    const updatedIds = [...currentIds, id];
    this.setFavoriteEventIds(updatedIds);
  }

  removeFavoriteEventId(id: number): void {
    const currentIds = this.getFavoriteEventIds();
    const updatedIds = currentIds.filter((eventId) => eventId !== id);
    this.setFavoriteEventIds(updatedIds);
  }

}
