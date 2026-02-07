import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Resume } from '../../models/resume.model';

const MY_RESUME_API = '/api/resumes/my';

@Injectable({ providedIn: 'root' })
export class ResumeEditService {
  constructor(private http: HttpClient) {}

  getMyResumeById(id: string): Observable<Resume | null> {
    return this.http.get<Resume | null>(`${MY_RESUME_API}/${id}`);
  }

  updateMyResume(id: string, resume: Resume): Observable<Resume> {
    return this.http.put<Resume>(`${MY_RESUME_API}/${id}`, resume);
  }
}
