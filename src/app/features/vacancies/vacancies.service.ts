import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Vacancy } from '../../models/vacancy.model';

const VACANCIES_API = '/api/vacancies';

@Injectable({ providedIn: 'root' })
export class VacanciesService {
  constructor(private http: HttpClient) {}

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(VACANCIES_API);
  }
}
