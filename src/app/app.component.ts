import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import User from './models/User';
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

  constructor(private userService: UserService) {}

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
    this.loading = true;

    this.userService
      .getUsers(this.page)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data);
          this.listUsers = [...data.users];
        },

        (err) => (this.error = err.message),
        () => (this.loading = false)
      );
  }

  handleEditar(user: User) {
    this.currentUser = user;
  }

  ngOnInit(): void {
    this.loadUsers();
  }
}
