import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .trim(),
  email: z.string()
    .trim()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .refine((email) => {
      const domain = email.split('@')[1];
      return domain && domain.includes('.');
    }, 'Please enter a valid email domain'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Phone number can only contain numbers and symbols')
    .trim(),
  id_last_five: z.string()
    .length(5, 'ID last five digits must be exactly 5 characters')
    .regex(/^[A-Z0-9]+$/, 'ID must contain only uppercase letters and numbers')
    .trim(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
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
