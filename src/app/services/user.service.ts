import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getUsersResponse } from '../@types/getUsersResponse';
import { saveUserResponse } from '../@types/saveUserResponse';
import User from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endPoint = 'users';
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  saveUser(name: string, email: string) {
    return this.httpClient.post<saveUserResponse>(
      `${this.baseUrl}/${this.endPoint}/create`,
      {
        name,
        email,
      }
    );
  }

  getUser(id: string) {}

  getUsers(page: number) {
    const url = `${this.baseUrl}/${this.endPoint}/?page=${page}`;
    return this.httpClient.get<getUsersResponse>(url);
  }

  updateUser(id: string, name: string, email: string) {
    const url = `${this.baseUrl}/${this.endPoint}/update`;
    return this.httpClient.put(url, {
      id,
      name,
      email,
    });
  }

  deleteUser(id: string) {
    const url = `${this.baseUrl}/${this.endPoint}/delete/${id}`;
    return this.httpClient.delete(url);
  }
}
