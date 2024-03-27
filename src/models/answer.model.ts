import mongoose from 'mongoose';

export const answerSchema = new mongoose.Schema({
	response: { type: String, required: true },
	surveyId: { type: String, required: true },
	userWhoResponded: { type: String, required: true },
});
