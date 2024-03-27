import mongoose from 'mongoose';
import type { Survey } from '@models/database';

export const surveySchema = new mongoose.Schema<Survey>({
	title: { type: String, required: true },
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});