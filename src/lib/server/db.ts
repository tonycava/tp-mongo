import mongoose, { type ConnectOptions } from 'mongoose';
import { env } from '$env/dynamic/private';
import { userSchema } from '@models/user.model';
import { surveySchema } from '@models/survey.model';
import { questionSchema } from '@models/question.model';
import { answerSchema } from '@models/answer.model';
import type {
	Question as QuestionModel,
	Survey as SurveyModel
} from '@models/database';

const mongooseOptions: ConnectOptions = {
	authSource: 'admin',
};

mongoose.connect(env.DATABASE_URL, mongooseOptions);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Survey = mongoose.models.Survey || mongoose.model<SurveyModel>('Survey', surveySchema);
export const Question = mongoose.models.Question || mongoose.model<QuestionModel>('Question', questionSchema);
export const Answer = mongoose.models.Answer || mongoose.model('Answer', answerSchema);