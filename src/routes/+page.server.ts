import type { PageServerLoad } from './$types';
import { type Action, type Actions, redirect } from '@sveltejs/kit';
import SurveyService from '@services/survey.service';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(303, '/login');

	const [mySurveys, otherSurveys] = await Promise.all([
		SurveyService.getSurveysByUserId(locals.user.id),
		SurveyService.getOtherSurveysByUserId(locals.user.id)
	]);

	const formattedSurveys = formatSurvey(mySurveys);
	const formattedOtherSurveys = formatSurvey(otherSurveys);

	return {
		surveys: formattedSurveys,
		otherSurveys: formattedOtherSurveys
	};
};

const formatSurvey = <T extends { _id: string; title: string }>(surveys: T[]) => {
	return surveys.map((survey) => {
		return {
			id: survey._id.toString(),
			title: survey.title
		};
	});
};


const deleteSurvey: Action = async ({ request }) => {
	const form = await request.formData();
	const surveyId = form.get('surveyId') as string;

	await SurveyService.deleteSurvey(surveyId);
};


export const actions: Actions = {
	deleteSurvey
};