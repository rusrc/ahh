import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { MOCK_VACANCIES, getAllResumes, getMyResumes, getResumeById } from '../../data/mock-data';

/**
 * Mock API for resumes and vacancies until backend is ready.
 */
export const dataMockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const url = req.url;

  if (req.method === 'GET') {
    if (url.endsWith('/api/hr/vacancies') || url.includes('/api/hr/vacancies')) {
      return of(
        new HttpResponse({
          status: 200,
          body: MOCK_VACANCIES,
        })
      );
    }

    if (url.endsWith('/api/vacancies') || url.includes('/api/vacancies')) {
      return of(
        new HttpResponse({
          status: 200,
          body: MOCK_VACANCIES,
        })
      );
    }

    if (/\/api\/resumes\/my(?:\?.*)?$/.test(url)) {
      return of(
        new HttpResponse({
          status: 200,
          body: getMyResumes(),
        })
      );
    }

    const myMatch = url.match(/\/api\/resumes\/my\/([^/?#]+)/);
    if (myMatch) {
      const resume = getResumeById(myMatch[1]);
      return of(
        new HttpResponse({
          status: resume ? 200 : 404,
          body: resume ?? null,
        })
      );
    }

    const match = url.match(/\/api\/resumes\/([^/?#]+)/);
    if (match) {
      const resume = getResumeById(match[1]);
      return of(
        new HttpResponse({
          status: resume ? 200 : 404,
          body: resume ?? null,
        })
      );
    }

    if (/\/api\/resumes(?:\?.*)?$/.test(url)) {
      return of(
        new HttpResponse({
          status: 200,
          body: getAllResumes(),
        })
      );
    }
  }

  if (req.method === 'PUT') {
    const myMatch = url.match(/\/api\/resumes\/my\/([^/?#]+)/);
    if (myMatch) {
      return of(
        new HttpResponse({
          status: 200,
          body: req.body ?? null,
        })
      );
    }
  }

  return next(req);
};
