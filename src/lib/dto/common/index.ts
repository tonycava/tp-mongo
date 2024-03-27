import z from 'zod';

export const passwordVerifier = z.string()
	.min(1, { message: 'Password is required' })
	.min(6, { message: 'Password must be at least 6 characters' })
	.max(100, { message: 'Password must be at most 100 characters' });

export const usernameVerifier = z.string()
	.min(1, 'Invalid length for username')