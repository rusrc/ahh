# Карта HTTP-запросов (Клиент → Сервер)

Этот документ содержит все HTTP-запросы, которые уже используются в клиенте, а также список недостающих эндпойнтов, которые нужны для полноценной серверной реализации.

## Существующие эндпойнты (уже используются)

### Авторизация
- `POST /api/auth/login`
  - Где используется: `AuthService.login`
  - Назначение: аутентификация, получение токена

### Вакансии (публичные / специалист)
- `GET /api/vacancies`
  - Где используется: `VacanciesService.getVacancies`
  - Назначение: список вакансий
- `GET /api/vacancies/:id`
  - Где используется: `VacanciesService.getVacancyById`
  - Назначение: детали вакансии

### Вакансии (HR)
- `GET /api/hr/vacancies`
  - Где используется: `MyVacanciesService.getMyVacancies`
  - Назначение: список вакансий HR
- `GET /api/hr/vacancies/:id`
  - Где используется: `MyVacanciesService.getMyVacancyById`
  - Назначение: детальная вакансия HR

### Резюме (HR / список специалистов)
- `GET /api/resumes`
  - Где используется: `SpecialistsService.getSpecialists`
  - Назначение: список кандидатов для HR

### Резюме (специалист — свои)
- `GET /api/resumes/my`
  - Где используется: `MyCvsService.getMyResumes`
  - Назначение: список моих резюме
- `GET /api/resumes/my/:id`
  - Где используется: `ResumeEditService.getMyResumeById`
  - Назначение: детали моего резюме (редактирование)
- `PUT /api/resumes/my/:id`
  - Где используется: `ResumeEditService.updateMyResume`
  - Назначение: обновление моего резюме

### Резюме (HR — детали)
- `GET /api/resumes/:id`
  - Где используется: `ResumeService.getResumeById`
  - Назначение: просмотр резюме

### Теги
- `GET /api/tags?query=&exclude=`
  - Где используется: `TagService.getTags`, `VacanciesService.getTags`
  - Назначение: автокомплит тегов

## Недостающие эндпойнты (нужны для закрытия фич)

### Авторизация
- `POST /api/auth/refresh`
  - Назначение: продление/ротация токена (опционально, но желательно)
- `POST /api/auth/logout`
  - Назначение: выход/инвалидация сессии (опционально)

### Вакансии (HR)
- `POST /api/hr/vacancies`
  - Назначение: создание вакансии (UI есть, запроса нет)
- `PUT /api/hr/vacancies/:id`
  - Назначение: обновление вакансии (UI есть, запроса нет)
- `DELETE /api/hr/vacancies/:id`
  - Назначение: удаление вакансии (если нужно по продукту)

### Резюме (специалист)
- `POST /api/resumes/my`
  - Назначение: создание резюме (UI есть, запроса нет)
- `DELETE /api/resumes/my/:id`
  - Назначение: удаление резюме (если нужно по продукту)

### Опционально (на будущее)
- `POST /api/vacancies/:id/respond`
  - Назначение: отклик на вакансию
- `POST /api/vacancies/:id/favorite`
- `DELETE /api/vacancies/:id/favorite`
  - Назначение: избранное
- `POST /api/tags`
- `DELETE /api/tags/:id`
  - Назначение: управление тегами (админка)

