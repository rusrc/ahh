## Project Summary
Anti Headhunter (ahh) is a web app for aggregating IT-focused resumes and vacancies
(an analog of hh.ru, but only for IT specialists).

## Roles and Primary Flows
- User role:
  - Vacancies list page
  - User's resumes list
  - Resume detail page split into cards:
    - personal data card
    - work experience cards in a hierarchy
- HR role:
  - Candidates (resumes) list
  - Vacancies list
  - Vacancy detail page

## Architecture Map (current repo)
- src/app/features:
  - vacancies: vacancies list UI
  - resume-detail: resume detail UI (card-based)
  - my-cvs: specialist resumes list (editable, links to resume-edit)
  - resume-edit: specialist resume editor
  - specialists: HR specialists list
  - my-vacancies: HR vacancies list + add form
  - login: auth UI
- src/app/models:
  - resume.model.ts, vacancy.model.ts (domain models)
- src/app/core/auth:
  - auth.service.ts, auth.guard.ts, auth.interceptor.ts
- src/app/data:
  - mock-data.ts (stub data source)
- src/app/layout:
  - layout component
- src/app/app.routes.ts (+ app.routes.server.ts):
  - routing configuration

## Decision Priorities
- Optimize for clarity and correctness of domain flows (User vs HR).
- Avoid breaking existing routes and auth flows.

## Notes / Risks
- Data layer is currently mocked (mock-data.ts). Treat it as temporary.
- No backend yet:
  - Auth is mocked in `src/app/core/auth` (service + interceptor).
  - Feature data is mocked via `src/app/core/data/mock-data.interceptor.ts`.
  This will be replaced by a real server later.
