import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .trim(),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 digits')
    .trim(),
  id_last_five: z.string()
    .length(5, 'ID last five digits must be exactly 5 characters')
    .trim(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  agreeToPrivacy: z.boolean()
    .refine(val => val === true, 'You must agree to the privacy policy')
});

export const signInSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .trim(),
  password: z.string()
    .min(1, 'Password is required')
});

export const profileUpdateSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .trim()
    .optional(),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 digits')
    .trim()
    .optional(),
  id_last_five: z.string()
    .length(5, 'ID last five digits must be exactly 5 characters')
    .trim()
    .optional()
});

export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  confirmNewPassword: z.string()
    .min(1, 'Please confirm your password')
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword']
});
