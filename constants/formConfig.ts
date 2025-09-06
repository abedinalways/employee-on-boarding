import { Department, JobType, Relationship } from "@/types/form";

export const FORM_STEPS = {
  PERSONAL_INFO: 1,
  JOB_DETAILS: 2,
  SKILLS_PREFERENCES: 3,
  EMERGENCY_CONTACT: 4,
  REVIEW_SUBMIT: 5,
} as const;

export const TOTAL_STEPS = 5;

export const STEP_TITLES = [
  'Personal Info',
  'Job Details',
  'Skills & Preferences',
  'Emergency Contact',
  'Review & Submit',
];

export const DEPARTMENTS: Department[] = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
];

export const JOB_TYPES: JobType[] = ['Full-time', 'Part-time', 'Contract'];

export const RELATIONSHIPS: Relationship[] = [
  'Parent',
  'Sibling',
  'Spouse',
  'Partner',
  'Friend',
  'Other',
];

export const SALARY_RANGES = {
  'Full-time': { min: 30000, max: 200000 },
  'Part-time': { min: 20000, max: 80000 },
  Contract: { min: 50, max: 150 },
};
