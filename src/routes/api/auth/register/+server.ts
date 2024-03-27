import type { RequestHandler } from '@sveltejs/kit';
import { responseCreator } from '$lib/server/response';
import AuthService from '@services/auth.service';
import { zodParse } from '$lib/server/zod.parser';
import { registerDto, type RegisterDto } from '$lib/dto/auth.dto';
import { signJWTToken } from '$lib/server/jwt';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const parsedBody = zodParse<RegisterDto>(body, registerDto);

	if (!parsedBody.isValid) {
		return responseCreator.createResponse('Invalid credentials', 400, parsedBody.message.message);
	}

	if (parsedBody.body.password !== parsedBody.body.verifyPassword) {
		return responseCreator.createResponse('Passwords do not match', 400);
	}

	const hashedPassword = await bcrypt.hash(parsedBody.body.password, 10);

	const user = await AuthService
		.createUser({ username: parsedBody.body.username, password: hashedPassword });


	const token = signJWTToken({ id: user.id, username: user.username });
	return responseCreator.createResponse('Registration successful', 200, { token });
};