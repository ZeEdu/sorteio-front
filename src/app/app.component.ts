import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import User from './models/User';
import { SortingService } from './services/sorting.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  error: string | null = null;
  loading = false;
  page = 0;

  public listUsers: User[] = [];
  public currentUser: User | null = null;

  constructor(
    private userService: UserService,
    private sortingService: SortingService,
    private _snackBar: MatSnackBar
  ) {}

  handleEmitReload() {
    this.page = 0;
    this.loadUsers();
  }

  nextPage() {
    this.page = this.page + 1;
    this.loadUsers();
  }
  previousPage() {
    this.page = this.page - 1;
    this.loadUsers();
  }

  loadUsers() {
    this.error = null;

    this.userService
      .getUsers(this.page)
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.listUsers = [...data.users];
        },
        (err) => (this.error = err.message)
      );
  }

  handleEditar(user: User) {
    this.currentUser = user;
  }

  handleSorting() {
    this.error = null;
    this.loading = true;
    this.sortingService
      .triggerSorting()
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data);
          this._snackBar.open('Sorteio criado com sucesso', 'Entendido', {
            duration: 3000,
          });
        },
        (err) => {
          this._snackBar.open(err.error.error[0], 'Entendido', {
            duration: 3000,
          });
        },
        () => {
          this.loading = false;
        }
      );
  }

  ngOnInit(): void {
    this.loadUsers();
  }
}
