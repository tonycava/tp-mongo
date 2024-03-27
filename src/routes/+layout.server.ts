import type { PageServerLoad } from './$types';
import { COOKEYS } from '$lib/helpers/cookie.helper';
import jwt from "jsonwebtoken"

export const load: PageServerLoad = ({ cookies }) => {
	const token = cookies.get(COOKEYS.JWT_TOKEN);
	const user = jwt.decode(token)
	return { user };
};