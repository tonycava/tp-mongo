import z from 'zod';
import { passwordVerifier, usernameVerifier } from '$lib/dto/common';

export const loginDto = z.object({
	username: usernameVerifier,
	password: passwordVerifier,
});

export type LoginDto = z.infer<typeof loginDto>;

export const registerDto = z.object({
	username: usernameVerifier,
	password: passwordVerifier,
	verifyPassword: passwordVerifier,
});

export type RegisterDto = z.infer<typeof registerDto>;