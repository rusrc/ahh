import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

const TAGS_API = '/api/tags';

@Injectable({ providedIn: 'root' })
export class TagService {
  constructor(private http: HttpClient) {}

  getTags(query: string, exclude: string[] | null | undefined): Observable<string[]> {
    const safeExclude = Array.isArray(exclude) ? exclude : [];
    return this.http.get<string[]>(TAGS_API, {
      params: {
        query: query ?? '',
        exclude: safeExclude.join(','),
      },
    });
  }
}
