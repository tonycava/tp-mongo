import type { PageServerLoad } from './$types';
import SurveyService from '@services/survey.service';
import { redirect } from '@sveltejs/kit';
import { formatSurvey } from '$lib';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { surveyId } = params;
	const isSurveyOfUser = await SurveyService.isSurveyOfUser(surveyId, locals.user.id);
	if (!isSurveyOfUser) {
		throw redirect(303, '/');
	}

	// TODO: Implement editing survey
	const survey = await SurveyService.getSurveyById(surveyId);
	const formattedSurvey = formatSurvey(survey);

	return { survey: formattedSurvey };
};