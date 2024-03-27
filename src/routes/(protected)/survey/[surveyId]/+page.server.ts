import type { PageServerLoad } from './$types';
import SurveyService from '@services/survey.service';
import type { Question } from '@models/database';
import { type Actions, type Action, fail } from '@sveltejs/kit';
import { Answer } from '$lib/server/db';
import { formatSurvey } from '$lib';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { surveyId } = params;

	const survey = await SurveyService.getSurveyById(surveyId);
	const formattedSurvey = formatSurvey(survey)

	return { survey: formattedSurvey };
};


const respondToSurvey: Action = async ({ request, locals, params }) => {
	const form = await request.formData();
	const keys = [...form.entries()] as [string, string][];

	const isAllInputsValid = keys.map(([_, response]) => response !== '').every(Boolean);

	if (!isAllInputsValid) {
		return fail(400, { message: 'All questions are required' });
	}

	const { surveyId } = params;
	for (const [_, response] of keys) {
		await Answer.create({
			userWhoResponded: locals.user.id,
			surveyId,
			response
		});

	}


	return {
		status: 200,
		message: 'Survey response recorded. You\'ll be redirect soon !'
	};
};
export const actions: Actions = {
	respondToSurvey
};