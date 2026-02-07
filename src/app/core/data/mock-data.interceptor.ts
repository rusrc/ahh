import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { MOCK_VACANCIES, getAllResumes, getMyResumes, getResumeById } from '../../data/mock-data';

/**
 * Мокаем API для страниц резюме и вакансий до появления реального бэкенда.
 */
export const dataMockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  if (req.method === 'GET') {
    const url = req.url;

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

    if (url.endsWith('/api/resumes/my') || url.includes('/api/resumes/my')) {
      return of(
        new HttpResponse({
          status: 200,
          body: getMyResumes(),
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

    if (url.endsWith('/api/resumes') || url.includes('/api/resumes')) {
      return of(
        new HttpResponse({
          status: 200,
          body: getAllResumes(),
        })
      );
    }
  }

  return next(req);
};
