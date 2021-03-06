import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient ) {}

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((user) => user[0] ? user[0] : undefined)
      );
  }

  createNewUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users', user)
      .pipe(
        map((response) => response)
      );
  }
}
