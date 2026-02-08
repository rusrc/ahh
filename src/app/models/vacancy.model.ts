export interface Vacancy {
  id: string;
  title: string;
  company: string;
  description?: string;
  tags: string[];
  salary?: string;
}
