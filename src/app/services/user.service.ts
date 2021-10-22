import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getUsersResponse } from '../@types/getUsersResponse';
import { saveUserResponse } from '../@types/saveUserResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endPoint = 'usuarios';
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  saveUser(name: string, email: string) {
    return this.httpClient.post<saveUserResponse>(
      `${this.baseUrl}/${this.endPoint}/criar`,
      {
        nome: name,
        email,
      }
    );
  }

  getUsers(page: number) {
    const url = `${this.baseUrl}/${this.endPoint}/?pagina=${page}`;
    return this.httpClient.get<getUsersResponse>(url);
  }

  updateUser(id: string, name: string, email: string) {
    const url = `${this.baseUrl}/${this.endPoint}/atualizar`;
    return this.httpClient.put(url, {
      id,
      nome: name,
      email,
    });
  }

  deleteUser(id: string) {
    const url = `${this.baseUrl}/${this.endPoint}/deletar/${id}`;
    return this.httpClient.delete(url);
  }
}
