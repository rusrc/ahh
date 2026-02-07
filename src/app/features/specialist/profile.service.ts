import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Resume } from '../../models/resume.model';

const RESUMES_API = '/api/resumes/my';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}

  getMyResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(RESUMES_API);
  }
}
