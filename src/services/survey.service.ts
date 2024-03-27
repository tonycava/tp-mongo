import { Survey } from '$lib/server/db';
import type { Question } from '@models/database';
import AnswerService from '@services/answer.service';
import QuestionService from '@services/question.service';

const getSurveysByUserId = (userId: string) => {
	return Survey.where('userId').eq(userId).select('_id title').exec();
};

const getOtherSurveysByUserId = (userId: string) => {
	return Survey.where('userId').ne(userId).select('_id title').exec();
};

const isSurveyOfUser = async (surveyId: string, userId: string) => {
	return await Survey.findOne({ _id: surveyId, userId: userId }).exec() !== null;
};

const deleteSurvey = async (surveyId: string) => {
	const survey = await Survey.findOne({ _id: surveyId }).exec();
	const questionsId = survey.questions.map((question: Question) => question._id.toString());

	await Survey.deleteOne({ _id: surveyId }).exec();
	await QuestionService.deleteQuestions(questionsId);
	await AnswerService.deleteAnswer(surveyId);

	console.log(survey);
};

const getSurveyById = (surveyId: string) => {
	return Survey
		.findOne({ _id: surveyId })
		.populate({
			path: 'questions',
			select: '_id question type options',
		})
		.select('-_id title questions')
		.exec();
};

export default {
	getSurveysByUserId,
	getSurveyById,
	getOtherSurveysByUserId,
	isSurveyOfUser,
	deleteSurvey
};