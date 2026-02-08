import { RenderMode, ServerRoute } from '@angular/ssr';
import { RESUME_IDS, VACANCY_IDS } from './data/mock-data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'resume/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => RESUME_IDS.map((id) => ({ id })),
  },
  {
    path: 'vacancy/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => VACANCY_IDS.map((id) => ({ id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
