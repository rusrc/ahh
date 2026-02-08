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
  - vacancy-detail: vacancy detail page (uses details card)
  - vacancy-edit: HR vacancy editor page (uses edit card)
- src/app/features/vacancies/cards:
  - vacancy-short-card: short vacancy card (lists, interactive tags optionally)
  - vacancy-details-card: detail vacancy card (vacancy detail page)
  - vacancy-edit-card: edit vacancy card (HR edit page)
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

## Cards & Lists Map
Vacancies:
- `vacancy-short-card`: used in lists
  - Specialist list: `/` (`vacancies` feature)
  - HR list: `/my-vacancies`
  - Modes: short (list), short + edit icon (HR list)
- `vacancy-details-card`: used in details page
  - Route: `/vacancy/:id`
  - Modes: details, details + edit icon (HR)
- `vacancy-edit-card`: used in edit page (HR only)
  - Route: `/vacancy-edit/:id`

Resumes:
- `resume-detail` cards (HR only):
  - personal data card
  - work experience cards (hierarchy)
- `resume-edit` cards (specialist only):
  - personal info editor card
  - work experience editor cards
  - contacts editor card
  - skills/tools editor card
