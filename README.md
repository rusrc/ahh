# Ahh

Ahh (Anti Headhunter) — веб‑приложение для агрегации IT‑резюме и вакансий
(для IT специалистов).

## О проекте
В проекте две роли и отдельные пользовательские потоки:
- Роль Пользователя:
  - Страница списка вакансий
  - Список собственных резюме
  - Страница резюме, разделенная на карточки (персональные данные + опыт работы и иерархия)
- Роль HR:
  - Список кандидатов (резюме)
  - Список вакансий
  - Страница вакансии

## Текущее состояние
- Серверной части пока нет: данные моковые.
- Авторизация моковая в `src/app/core/auth` (service + interceptor), позже будет заменена на реальный сервер.

## Технологии
- Angular (проект создан через [Angular CLI](https://github.com/angular/angular-cli) версии 21.1.2)

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
