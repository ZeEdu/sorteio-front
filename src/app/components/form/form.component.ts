import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import User from 'src/app/models/User';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Output() emitReload = new EventEmitter();

  currentUser: User | null = null;
  currentUserSub$: Subscription = new Subscription();

  loading: boolean = false;

  constructor(
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.currentUserSub$.unsubscribe();
  }

  isUpdate = false;
  name: string = '';
  email: string = '';
  errors: string[] | null = null;

  ngOnInit(): void {
    this.currentUserSub$ = this.currentUserService
      .getCurrentUser()
      .subscribe((data) => {
        if (data) {
          this.currentUser = data;
          this.name = data.nome;
          this.email = data.email;
        }
      });
  }

  onSubmit() {
    this.errors = null;
    this.loading = true;

    if (this.currentUser) {
      this.updateUser(this.currentUser.id, this.name, this.email);
    } else {
      this.saveUser(this.name, this.email);
    }
  }

  cleanup() {
    this.loading = false;
    this.currentUserService.setCurrentUser(null);
    this.name = '';
    this.email = '';
  }

  updateUser(id: string, name: string, email: string) {
    this.userService
      .updateUser(id, name, email)
      .pipe(take(1))
      .subscribe(
        () => {
          this._snackBar.open('Usuário atualizado com sucesso', 'Entendido', {
            duration: 3000,
          });
          this.emitReload.emit();
        },
        (err) => (this.errors = [...err.error.errors]),
        () => this.cleanup()
      );
  }

  saveUser(name: string, email: string) {
    this.userService
      .saveUser(name, email)
      .pipe(take(1))
      .subscribe(
        () => {
          this._snackBar.open('Usuário criado com sucesso', 'Entendido', {
            duration: 5,
          });
          this.emitReload.emit();
        },
        (err) => (this.errors = [...err.error.errors]),
        () => this.cleanup()
      );
  }
}
