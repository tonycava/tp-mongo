import type { RequestHandler } from '@sveltejs/kit';
import { responseCreator } from '$lib/server/response';
import { zodParse } from '$lib/server/zod.parser';
import { type LoginDto, loginDto } from '$lib/dto/auth.dto';
import bcrypt from 'bcrypt';
import { signJWTToken } from '$lib/server/jwt';
import AuthService from '@services/auth.service';


export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const parsedBody = zodParse<LoginDto>(body, loginDto);

	if (!parsedBody.isValid) {
		return responseCreator.createResponse('Invalid credentials', 400, parsedBody.message.message);
	}

	const user = await AuthService.getUserByName(parsedBody.body.username);
	if (!user) {
		return responseCreator.createResponse('Invalid credentials', 400);
	}

	const isPasswordValid = await bcrypt.compare(parsedBody.body.password, user.password);

	if (!isPasswordValid) {
		return responseCreator.createResponse('Invalid credentials', 400);
	}

	const token = signJWTToken({ id: user.id, username: user.username });
	return responseCreator.createResponse('Login successful', 200, { token });
};