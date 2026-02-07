import type { Vacancy } from '../models/vacancy.model';
import type { Resume } from '../models/resume.model';

export const MOCK_VACANCIES: Vacancy[] = [
  { id: '1', title: 'Frontend-разработчик (Angular)', company: 'ООО ТехСофт', tags: ['Angular', 'TypeScript', 'JavaScript'], salary: 'от 150 000 ₽' },
  { id: '2', title: 'Backend-разработчик (Node.js)', company: 'Стартап Инновации', tags: ['Node.js', 'PostgreSQL', 'REST'], salary: 'от 180 000 ₽' },
  { id: '3', title: 'Fullstack разработчик', company: 'Цифра', tags: ['Angular', 'Node.js', 'TypeScript'], salary: 'по договорённости' },
  { id: '4', title: 'React-разработчик', company: 'ВебСтудио', tags: ['React', 'JavaScript', 'CSS'], salary: 'от 120 000 ₽' },
  { id: '5', title: 'Java-разработчик', company: 'Банк Софт', tags: ['Java', 'Spring', 'SQL'], salary: 'от 200 000 ₽' },
];

const MOCK_MY_RESUMES: Resume[] = [
  {
    id: 'r1',
    title: 'Frontend-разработчик',
    personalInfo: {
      fullName: 'Иванов Иван Иванович',
      birthDate: '1990-05-15',
      city: 'Москва',
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
        period: '2018 — 2020',
        description: 'Вёрстка лендингов, поддержка корпоративного сайта на AngularJS.',
      },
      {
        id: 'e2',
        company: 'Стартап Тех',
        position: 'Frontend Developer',
        period: '2020 — 2024',
        description: 'Разработка SPA на Angular, код-ревью, менторинг джуниоров.',
      },
    ],
  },
  {
    id: 'r2',
    title: 'Fullstack (Angular + Node)',
    personalInfo: {
      fullName: 'Иванов Иван Иванович',
      city: 'Москва',
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
        period: '2020 — 2024',
        description: 'Разработка SPA на Angular, участие в бэкенде на Node.js.',
      },
    ],
  },
];

export function getMyResumes(): Resume[] {
  return [...MOCK_MY_RESUMES];
}

export function getResumeById(id: string): Resume | undefined {
  return MOCK_MY_RESUMES.find((r) => r.id === id);
}

export const RESUME_IDS = MOCK_MY_RESUMES.map((r) => r.id);
