import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getSortingResponse } from '../@types/getSortingResponse';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private endPoint = 'sorteio';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  triggerSorting() {
    const url = `${this.baseUrl}/${this.endPoint}/`;
    return this.http.get<getSortingResponse>(url);
  }
}
