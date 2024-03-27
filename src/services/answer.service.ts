import { Answer } from '$lib/server/db';

const deleteAnswer = (surveyId: string) => {
	return Answer.deleteMany({ surveyId }).exec();
}

export default  {
	deleteAnswer
}