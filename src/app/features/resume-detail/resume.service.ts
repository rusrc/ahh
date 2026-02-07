import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Resume } from '../../models/resume.model';

const RESUMES_API = '/api/resumes';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  constructor(private http: HttpClient) {}

  getResumeById(id: string): Observable<Resume | null> {
    return this.http.get<Resume | null>(`${RESUMES_API}/${id}`);
  }
}
