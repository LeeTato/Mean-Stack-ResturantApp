
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  createUser,
  loginUser,
  updateUser,
} from 'src/app/store/actions/user/user.actions';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements  OnInit, OnChanges {
  userLogin: FormGroup;
  @Input() selectedUser: User | null = null;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.userLogin = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.selectedUser?.currentValue) {
      const user = changes?.selectedUser?.currentValue;
      this.userLogin.get('name')?.setValue(user.name);
      this.userLogin.get('email')?.setValue(user.email);
      this.userLogin.get('username')?.setValue(user.username);
      this.userLogin.updateValueAndValidity();
    }
  }

  postUser(selectedUser: User | null) {
    !selectedUser
      ? this.store.dispatch(createUser({ data: this.userLogin.value }))
      : this.store.dispatch(
          updateUser({ data: { ...selectedUser, ...this.userLogin.value } })
        );
    this.userLogin.reset();
  }

  login() {
    this.store.dispatch(loginUser({ data: this.userLogin.value }))
  }
}
