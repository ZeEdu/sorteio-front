import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private _currentUser = new BehaviorSubject<User | null>(null);
  constructor() {}

  setCurrentUser(next: User | null) {
    this._currentUser.next(next);
  }

  getCurrentUser() {
    return this._currentUser.asObservable();
  }
}
