import type { PageServerLoad } from './$types';
import type { Action, Actions } from '@sveltejs/kit';
import { organizeQuestions } from '$lib';
import { Question, Survey, Answer } from '$lib/server/db';

export const load: PageServerLoad = () => {
	return { name: 'hello' };
};

const create: Action = async ({ request, locals }) => {
	const form = await request.formData();
	const title = form.get('title') as string;
	const formData = [...form.entries()] as [string, string][];
	const organizedQuestions = organizeQuestions(formData);
	console.log(organizedQuestions);
	const questions = await Promise.all(organizedQuestions.map(async (question) => {
		return await Question.create({
			question: question.question,
			type: question.type,
			options: question.type === 'text' ? [] : question.options
		});
	}));

	const survey = await Survey.create({
		title,
		questions,
		userId: locals.user.id
	});

};

export const actions: Actions = {
	create
};