import * as z from 'zod';

// Phone number validation
const phoneRegex = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/;

// File validation helper
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .refine(val => val.trim().split(' ').length >= 2, {
      message: 'Please enter at least 2 words (first and last name)',
    }),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Phone number must be in format +1-123-456-7890'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(val => {
      const today = new Date();
      const birthDate = new Date(val);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, 'Must be at least 18 years old'),
  profilePicture: z
    .any()
    .optional()
    .refine(file => {
      if (!file || file.length === 0) return true; // Optional field
      return file[0]?.size <= MAX_FILE_SIZE;
    }, 'File size must be less than 2MB')
    .refine(file => {
      if (!file || file.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
    }, 'Only JPG and PNG files are accepted'),
});

export const jobDetailsSchema = z
  .object({
    department: z.string().min(1, 'Department is required'),
    positionTitle: z
      .string()
      .min(3, 'Position title must be at least 3 characters'),
    startDate: z
      .string()
      .min(1, 'Start date is required')
      .refine(val => {
        const today = new Date();
        const startDate = new Date(val);
        const diffTime = startDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 90;
      }, 'Start date must be today or within 90 days in the future'),
    jobType: z.enum(['Full-time', 'Part-time', 'Contract'], {
      required_error: 'Job type is required',
    }),
    salaryExpectation: z
      .number({
        required_error: 'Salary expectation is required',
        invalid_type_error: 'Salary must be a number',
      })
      .positive('Salary must be greater than 0'),
    manager: z.string().min(1, 'Manager selection is required'),
  })
  .refine(
    data => {
      // Dynamic salary validation based on job type
      if (data.jobType === 'Contract') {
        return data.salaryExpectation >= 50 && data.salaryExpectation <= 150;
      }
      return (
        data.salaryExpectation >= 30000 && data.salaryExpectation <= 200000
      );
    },
    {
      message: 'Salary expectation is out of range for selected job type',
      path: ['salaryExpectation'],
    }
  );

export const skillsPreferencesSchema = z.object({
  primarySkills: z.array(z.string()).min(3, 'Please select at least 3 skills'),
  skillsExperience: z.record(z.number().min(0).max(20)),
  workingHours: z
    .object({
      start: z.string().min(1, 'Start time is required'),
      end: z.string().min(1, 'End time is required'),
    })
    .refine(
      data => {
        const start = new Date(`2000-01-01 ${data.start}`);
        const end = new Date(`2000-01-01 ${data.end}`);
        return start < end;
      },
      {
        message: 'End time must be after start time',
        path: ['end'],
      }
    ),
  remoteWorkPreference: z.number().min(0).max(100),
  managerApproved: z.boolean().optional(),
  extraNotes: z
    .string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional(),
});

export const emergencyContactSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Phone number must be in format +1-123-456-7890'),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
});

export const reviewSubmitSchema = z.object({
  confirmationChecked: z.boolean().refine(val => val === true, {
    message: 'You must confirm all information is correct',
  }),
});

// Combined schema for final validation
export const completeFormSchema = z.object({
  personal: personalInfoSchema,
  job: jobDetailsSchema,
  skills: skillsPreferencesSchema,
  emergency: emergencyContactSchema,
  review: reviewSubmitSchema,
});
