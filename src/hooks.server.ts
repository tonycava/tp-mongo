import type { Handle } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { COOKEYS, defaultCookiesOptions } from '$lib/helpers/cookie.helper';

export const handle: Handle = async ({ resolve, event }) => {
	const jwtToken = event.cookies.get(COOKEYS.JWT_TOKEN);

	const payload = jwt.decode(jwtToken ?? '') as JwtPayload | null;
	if (!payload) {
		event.cookies.delete(COOKEYS.JWT_TOKEN, { path: '/' });
		return resolve(event);
	}

	event.locals.user = {
		id: payload.id,
		username: payload.username,
	};

	return resolve(event);
};