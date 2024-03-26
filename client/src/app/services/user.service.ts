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
  getAllUsers(): Observable<User[] | null> {
    return this.http.get<User[]>('http://localhost:5000/api/user').pipe(
      map((users: User[]) => {
        if (users)
          return users;

        return null;
      })
    )
  }

  getUserById(): Observable<User | null> {
    return this.http.get<User>('http://localhost:5000/api/user/65bf51d6491e6c7776652271').pipe(
      map((user: User | null) => {
        if (user)
          return user;

        return null;
      })
    )
  }
}

//#region JWT interceptor
// let requestOptions;
    // Type is not declared since options can vary. see this page: https://angular.io/api/common/http/HttpClient

    // this.accountService.currentUser$.pipe(take(1)).subscribe({
    //   next: (currentUser: User | null) => {
    //     if (currentUser) {
    //       requestOptions = {
    //         headers: new HttpHeaders({ 'Authorization': `Bearer ${currentUser.token}` })
    //       }
    //     }
    //   }
    // });

//interceptor:
//{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
//#endregion