export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  profilePicture?: File;
}

export interface JobDetails {
  department: string;
  positionTitle: string;
  startDate: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  salaryExpectation: number;
  manager: string;
}

export interface SkillsPreferences {
  primarySkills: string[];
  skillsExperience: Record<string, number>;
  workingHours: {
    start: string;
    end: string;
  };
  remoteWorkPreference: number;
  managerApproved?: boolean;
  extraNotes?: string;
}

export interface EmergencyContact {
  contactName: string;
  relationship: string;
  phoneNumber: string;
  guardianName?: string;
  guardianPhone?: string;
}

export interface ReviewSubmit {
  confirmationChecked: boolean;
}

export interface FormData {
  personal?: PersonalInfo;
  job?: JobDetails;
  skills?: SkillsPreferences;
  emergency?: EmergencyContact;
  review?: ReviewSubmit;
}

export interface Manager {
  id: string;
  name: string;
  department: string;
}

export type Department =
  | 'Engineering'
  | 'Marketing'
  | 'Sales'
  | 'HR'
  | 'Finance';
export type JobType = 'Full-time' | 'Part-time' | 'Contract';
export type Relationship =
  | 'Parent'
  | 'Sibling'
  | 'Spouse'
  | 'Partner'
  | 'Friend'
  | 'Other';
