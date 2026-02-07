import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Vacancy } from '../../models/vacancy.model';

const HR_VACANCIES_API = '/api/hr/vacancies';

@Injectable({ providedIn: 'root' })
export class MyVacanciesService {
  constructor(private http: HttpClient) {}

  getMyVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(HR_VACANCIES_API);
  }
}
