import { z } from 'zod';

// createExperience validation using zod
const createExperienceValidationSchema = z.object({
  body: z.object({
    company: z
      .string({
        required_error: 'Company is required!',
        invalid_type_error: 'Company must be string!',
      })
      .trim()
      .min(2, { message: 'Company must have minimum 2 characters!' })
      .max(100, { message: 'Company cannot exceed 100 characters!' }),

    position: z
      .string({
        required_error: 'Position is required!',
        invalid_type_error: 'Position must be string!',
      })
      .trim()
      .min(2, { message: 'Position must have minimum 2 characters!' })
      .max(100, { message: 'Position cannot exceed 100 characters!' }),

    description: z
      .string({
        required_error: 'Description is required!',
        invalid_type_error: 'Description must be string!',
      })
      .min(20, { message: 'Description must have minimum 20 characters!' })
      .trim(),

    timeFrame: z
      .string({
        required_error: 'Time-Frame is required!',
        invalid_type_error: 'Time-Frame must be a string!',
      })
      .min(5, { message: 'Time-Frame must have minimum 10 characters!' })
      .trim(),
  }),
});

// updateExperienceById validation using zod
const updateExperienceValidationSchema = z.object({
  body: z.object({
    company: z
      .string({
        required_error: 'Company is required!',
        invalid_type_error: 'Company must be string!',
      })
      .trim()
      .min(2, { message: 'Company must have minimum 2 characters!' })
      .max(100, { message: 'Company cannot exceed 100 characters!' }),

    position: z
      .string({
        required_error: 'Position is required!',
        invalid_type_error: 'Position must be string!',
      })
      .trim()
      .min(2, { message: 'Position must have minimum 2 characters!' })
      .max(100, { message: 'Position cannot exceed 100 characters!' }),

    description: z
      .string({
        required_error: 'Description is required!',
        invalid_type_error: 'Description must be string!',
      })
      .min(20, { message: 'Description must have minimum 20 characters!' })
      .trim(),

    timeFrame: z
      .string({
        required_error: 'Time-Frame is required!',
        invalid_type_error: 'Time-Frame must be a string!',
      })
      .min(5, { message: 'Time-Frame must have minimum 10 characters!' })
      .trim(),
  }),
});

export const experienceValidation = {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
};
