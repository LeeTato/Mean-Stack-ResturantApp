import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';
import { loginUserSuccess } from '../store/actions/user/user.actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUserId = '';

  constructor(private api: ApiService, private router:Router) {}

  getUsers() {
    return this.api.get<{ data: User[] }>('users').pipe(map((res) => res.data));
  }
  createUser(user: User) {
    // this.router.navigate(['/userLogin']);
    return this.api
      .post<{ data: User }>('create-user', user)
      .pipe(map((res) => res.data));
  }
  login(user: Partial<User>) {
    return this.api
      .post<{ data: User }>('login', user)
      .pipe(map((res) => res.data));
  }
  updateUser(user: User) {
    return this.api.put<User>('update-user/' + user._id, user);
  }

  deleteUser(user: User) {
    return this.api
      .delete<{ data: User }>('delete-user/' + user._id)
      .pipe(map((res) => res.data));
  }

  selectUser(id: string) {
    this.selectedUserId = id;
  }

  logout(){
    this.router.navigate(['/userLogin']);
     return this.api.get('logout')

  }
  loginNavigate(){
    return of (this.router.navigate(['/menuList']));//of convert the line to observable
  }

  createLoginNavigate(){
    return of(this.router.navigate(['/userLogin']));//of convert the code to observable
  }
  sendEmail(data:any){
    return this.api.post('sendEmail', data)
    }
}
