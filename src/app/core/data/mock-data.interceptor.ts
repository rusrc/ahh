import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {
  MOCK_TAGS,
  MOCK_VACANCIES,
  getAllResumes,
  getMyResumes,
  getResumeById,
  getVacancyById,
} from '../../data/mock-data';

/**
 * Mock API for resumes and vacancies until backend is ready.
 */
export const dataMockInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const url = req.url;

  if (req.method === 'GET') {
    const hrVacancyMatch = url.match(/\/api\/hr\/vacancies\/([^/?#]+)/);
    if (hrVacancyMatch) {
      const vacancy = getVacancyById(hrVacancyMatch[1]);
      return of(
        new HttpResponse({
          status: vacancy ? 200 : 404,
          body: vacancy ?? null,
        })
      );
    }

    if (url.endsWith('/api/hr/vacancies') || url.includes('/api/hr/vacancies')) {
      return of(
        new HttpResponse({
          status: 200,
          body: MOCK_VACANCIES,
        })
      );
    }

    const vacancyMatch = url.match(/\/api\/vacancies\/([^/?#]+)/);
    if (vacancyMatch) {
      const vacancy = getVacancyById(vacancyMatch[1]);
      return of(
        new HttpResponse({
          status: vacancy ? 200 : 404,
          body: vacancy ?? null,
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

    if (url.includes('/api/tags')) {
      const query = (req.params.get('query') ?? '').toLowerCase().trim();
      const exclude = (req.params.get('exclude') ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const excludeSet = new Set(exclude.map((t) => t.toLowerCase()));
      const result = MOCK_TAGS.filter((tag) => {
        if (excludeSet.has(tag.toLowerCase())) return false;
        if (!query) return true;
        return tag.toLowerCase().includes(query);
      });
      return of(
        new HttpResponse({
          status: 200,
          body: result,
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
