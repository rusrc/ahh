import type { Vacancy } from '../models/vacancy.model';
import type { Resume } from '../models/resume.model';

export const MOCK_VACANCIES: Vacancy[] = [
  {
    id: '1',
    title: 'Frontend-разработчик (Angular)',
    company: 'ООО ТехСофт',
    description:
      'Angular front-end developer for an HR platform. Tasks: build UI, integrate APIs, improve UX, and optimize performance.',
    tags: ['Angular', 'TypeScript', 'JavaScript'],
    salary: 'от 150 000 ₽',
  },
  {
    id: '2',
    title: 'Backend-разработчик (Node.js)',
    company: 'Стартап Инновации',
    description:
      'Backend engineer for high-load services. Stack: Node.js, PostgreSQL. Tasks: API design, query optimization, monitoring.',
    tags: ['Node.js', 'PostgreSQL', 'REST'],
    salary: 'от 180 000 ₽',
  },
  {
    id: '3',
    title: 'Fullstack разработчик',
    company: 'Цифра',
    description:
      'Fullstack developer for internal systems. Front: Angular, Back: Node.js. Strong TypeScript and architecture experience.',
    tags: ['Angular', 'Node.js', 'TypeScript'],
    salary: 'по договорённости',
  },
  {
    id: '4',
    title: 'React-разработчик',
    company: 'ВебСтудио',
    description:
      'Project-based role in an agency. React + Redux, responsive layouts, close work with designers.',
    tags: ['React', 'JavaScript', 'CSS'],
    salary: 'от 120 000 ₽',
  },
  {
    id: '5',
    title: 'Java-разработчик',
    company: 'Банк Софт',
    description:
      'Banking services development. Stack: Java, Spring, SQL. Experience with microservices and production support.',
    tags: ['Java', 'Spring', 'SQL'],
    salary: 'от 200 000 ₽',
  },
];

export function getVacancyById(id: string): Vacancy | undefined {
  return MOCK_VACANCIES.find((vacancy) => vacancy.id === id);
}

export const VACANCY_IDS = MOCK_VACANCIES.map((vacancy) => vacancy.id);

export const MOCK_TAGS: string[] = [
  'Angular',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'PostgreSQL',
  'REST',
  'React',
  'CSS',
  'HTML',
  'C#',
  '.NET',
  'ASP.NET',
  'WPF',
  'Blazor',
  'Azure',
  'AWS',
  'Docker',
  'Kubernetes',
  'Redis',
  'RabbitMQ',
  'GraphQL',
  'Svelte',
  'Vue',
  'Next.js',
  'NestJS',
  'Spring',
  'Java',
  'Python',
  'Go',
  'PHP',
  'Laravel',
  'MongoDB',
  'MySQL',
  'SQL',
  'CI/CD',
  'Git',
  'Linux',
];

const MOCK_MY_RESUMES: Resume[] = [
  {
    id: 'r1',
    title: 'Frontend-разработчик',
    personalInfo: {
      fullName: 'Иванов Иван Иванович',
      birthDate: '1990-05-15',
      city: 'Москва',
      photoUrl: 'https://i.pravatar.cc/160?img=11',
    },
    contacts: {
      email: 'ivanov@example.com',
      phone: '+7 (999) 123-45-67',
      telegram: '@ivanov_dev',
    },
    workExperience: [
      {
        id: 'e1',
        company: 'ООО ВебАгентство',
        position: 'Junior Frontend Developer',
        startDate: '2018-03-01',
        endDate: '2020-02-01',
        isCurrent: false,
        description:
          'Вёрстка лендингов, поддержка корпоративного сайта на AngularJS.',
      },
      {
        id: 'e2',
        company: 'Стартап Тех',
        position: 'Frontend Developer',
        startDate: '2020-03-01',
        endDate: '2024-01-15',
        isCurrent: false,
        description:
          'Разработка SPA на Angular, код-ревью, менторинг джуниоров.',
      },
    ],
  },
  {
    id: 'r2',
    title: 'Fullstack (Angular + Node)',
    personalInfo: {
      fullName: 'Иванов Иван Иванович',
      city: 'Москва',
      photoUrl: 'https://i.pravatar.cc/160?img=32',
    },
    contacts: {
      email: 'ivanov@example.com',
      phone: '+7 (999) 123-45-67',
    },
    workExperience: [
      {
        id: 'e3',
        company: 'Стартап Тех',
        position: 'Frontend Developer',
        startDate: '2020-03-01',
        endDate: '2024-01-15',
        isCurrent: false,
        description:
          'Разработка SPA на Angular, участие в бэкенде на Node.js.',
      },
    ],
  },
];

export function getMyResumes(): Resume[] {
  return [...MOCK_MY_RESUMES];
}

export function getAllResumes(): Resume[] {
  return [...MOCK_MY_RESUMES];
}

export function getResumeById(id: string): Resume | undefined {
  return MOCK_MY_RESUMES.find((r) => r.id === id);
}

export const RESUME_IDS = MOCK_MY_RESUMES.map((r) => r.id);
