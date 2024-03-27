import type { CookieSerializeOptions } from 'cookie';

export enum COOKEYS {
	JWT_TOKEN = 'jwt_token',
}

export const defaultCookiesOptions: CookieSerializeOptions & { path: string } = {
	path: '/',
	httpOnly: false,
	// sameSite: 'strict',
	secure: process.env.NODE_ENV === 'production',
	maxAge: 60 * 60 * 24 * 3
};