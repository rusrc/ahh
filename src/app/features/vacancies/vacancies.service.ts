import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, type Observable } from 'rxjs';
import type { Vacancy } from '../../models/vacancy.model';

const VACANCIES_API = '/api/vacancies';

@Injectable({ providedIn: 'root' })
export class VacanciesService {
  constructor(private http: HttpClient) {}

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(VACANCIES_API);
  }

  getVacancyById(id: string): Observable<Vacancy | null> {
    return this.http.get<Vacancy | null>(`${VACANCIES_API}/${id}`).pipe(catchError(() => of(null)));
  }

  getTags(query: string, exclude: string[]): Observable<string[]> {
    return this.http.get<string[]>('/api/tags', {
      params: {
        query,
        exclude: exclude.join(','),
      },
    });
  }
}
