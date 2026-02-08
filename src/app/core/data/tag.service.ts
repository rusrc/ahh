import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

const TAGS_API = '/api/tags';

@Injectable({ providedIn: 'root' })
export class TagService {
  constructor(private http: HttpClient) {}

  getTags(query: string, exclude: string[]): Observable<string[]> {
    return this.http.get<string[]>(TAGS_API, {
      params: {
        query,
        exclude: exclude.join(','),
      },
    });
  }
}
