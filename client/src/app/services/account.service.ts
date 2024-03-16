import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RegisterUser } from '../models/register-user.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { loginUser } from '../models/login-user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {                             // Initialization
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(userInput: RegisterUser): Observable<User | null> {
    return this.http.post<User>('http://localhost:5000/api/account/register', userInput).pipe(
      map(userResponse => {
        if (userResponse) {
          this.setCurrentUser(userResponse);

          return userResponse;
        }

        return null;
      })
    );
  }

  loginUser(userInput: loginUser): Observable<User | null> {
    return this.http.post<User>('http://localhost:5000/api/account/login', userInput).pipe(
      map(userResponse => {
        if (userResponse) {
          this.setCurrentUser(userResponse);

          return userResponse;
        }

        return null;
      })
    );
  }

  setCurrentUser(user: User): void {
    this.currentUserSource.next(user);

    localStorage.setItem('user', JSON.stringify(user));
  }

  logoutUser(): void {
    this.currentUserSource.next(null);

    localStorage.removeItem('user');
  }

  // logoutUser(): void {
  //   this.currentUserSource.next(null);

  //   localStorage.removeItem('user');

  //   this.router.navigateByUrl('/login');
  // }
}