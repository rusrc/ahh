import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Resume } from '../../models/resume.model';

const SPECIALISTS_API = '/api/resumes';

@Injectable({ providedIn: 'root' })
export class SpecialistsService {
  constructor(private http: HttpClient) {}

  getSpecialists(): Observable<Resume[]> {
    return this.http.get<Resume[]>(SPECIALISTS_API);
  }
}
