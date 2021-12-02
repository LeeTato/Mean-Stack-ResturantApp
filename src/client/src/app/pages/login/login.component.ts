import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import {
  createUser,
  loginUser,
  updateUser,
} from 'src/app/store/actions/user/user.actions';
import { loginFailerMsgSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  userLogin: FormGroup;
  @Input() selectedUser: User | null = null;
  loginFailMsg$: Observable<string>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.loginFailMsg$ = this.store.select(loginFailerMsgSelector);
    this.userLogin = this.fb.group({
    email: [
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


  login() {
    this.store.dispatch(loginUser({ data: this.userLogin.value }));
    this.userLogin.reset();
  }
}
