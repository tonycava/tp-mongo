import mongoose from 'mongoose';
import type { Question } from '@models/database';

export const questionSchema = new mongoose.Schema<Question>({
	question: { type: String, required: true },
	type: { type: String, required: true },
	options: [String],
});

