export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface Resume {
  id: string;
  title: string;
  personalInfo: {
    fullName: string;
    birthDate?: string;
    city?: string;
    photoUrl?: string;
  };
  contacts: {
    email: string;
    phone?: string;
    telegram?: string;
  };
  workExperience: WorkExperience[];
}
