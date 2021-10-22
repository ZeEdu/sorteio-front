import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import User from 'src/app/models/User';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss'],
})
export class DisplayUserComponent implements OnInit {
  @Input()
  user!: User;
  @Output() emitReload = new EventEmitter();

  constructor(
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  triggerEdit() {
    this.currentUserService.setCurrentUser(this.user);
  }

  triggerExclude() {
    if (this.user.id) {
      this.userService
        .deleteUser(this.user.id)
        .pipe(take(1))
        .subscribe(
          (data) => {
            this._snackBar.open('Usuário deletado com sucesso', 'Entendido', {
              duration: 3000,
            });
            this.emitReload.emit();
          },
          (err) => {
            this._snackBar.open(
              'Um erro ocorreu. Tente novamente',
              'Entendido',
              {
                duration: 3000,
              }
            );
          }
        );
    }
  }
}
