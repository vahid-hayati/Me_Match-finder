import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, map, take } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private accountService: AccountService) { }

  // Observable  / Promise
  getAllUsers(): Observable<User[]> {
    let requestOptions; 
    // Type is not declared since options can vary. see this page: https://angular.io/api/common/http/HttpClient
     
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: currentUser => {
        if (currentUser) {
          requestOptions = {
            headers: new HttpHeaders ({'Authorization': `Bearer ${currentUser.token}`})
          }
        }
      }
    });

    return this.http.get<User[]>('http://localhost:5000/api/user', requestOptions).pipe( 
      map(users => {
        return users;
      })
    )
  }
}