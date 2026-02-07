export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Resume {
  id: string;
  title: string;
  personalInfo: {
    fullName: string;
    birthDate?: string;
    city?: string;
  };
  contacts: {
    email: string;
    phone?: string;
    telegram?: string;
  };
  workExperience: WorkExperience[];
}
