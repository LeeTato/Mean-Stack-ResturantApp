import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {
  createLoginNavigateSuccess,
  createUser,
  createUserFailure,
  createUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loginNavigateSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  logoutUser,
  logoutUserFailure,
  logoutUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from '../../actions/user/user.actions';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((data) => loadUsersSuccess({ data })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  updateUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action.data).pipe(
          map((data) => updateUserSuccess({ data })),
          catchError((error) => of(updateUserFailure({ error })))
        )
      )
    )
  );

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      mergeMap((action) =>
        this.userService.createUser(action.data).pipe(
          map((data) => createUserSuccess({ data })),
          catchError((error) => of(createUserFailure({ error })))
        )
      )
    )
  );

  deleteUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.data).pipe(
          map((data) => deleteUserSuccess({ data })),
          catchError((error) => of(deleteUserFailure({ error })))
        )
      )
    )
  );

  loginUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginUser),
    mergeMap((action) =>
      this.userService.login(action.data).pipe(
        map((data) => loginUserSuccess({ data })),
        catchError((error) => of(loginUserFailure({ error })))
      )
    )
  )
);

logoutUsers$ = createEffect(() =>
this.actions$.pipe(
  ofType(logoutUser),
  mergeMap(() =>
    this.userService.logout().pipe(
      map((data) => logoutUserSuccess()),
      catchError((error) => of(logoutUserFailure({ error })))
    )
  )
)
);

loginNavigate$ = createEffect(()=>
this.actions$.pipe(
  ofType(loginUserSuccess),
  mergeMap(() =>
    this.userService.loginNavigate().pipe(
      map(() => loginNavigateSuccess()),

    )
  )
)
);

createLoginNavigate$ = createEffect(()=>
this.actions$.pipe(
  ofType(createUserSuccess),
  mergeMap(() =>
    this.userService. createLoginNavigate().pipe(
      map(() => createLoginNavigateSuccess()),

    )
  )
)
);


  constructor(private actions$: Actions, private userService: UserService) {}
}
