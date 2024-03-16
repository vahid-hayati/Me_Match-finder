import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Observable  / Promise
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/api/user').pipe(
      map(users => {
        return users;
      })
    )
  }
}