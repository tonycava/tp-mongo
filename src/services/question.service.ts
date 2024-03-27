import { Question } from '$lib/server/db';

const deleteQuestions = (questionIdsToDelete: string[]) => {
	return Question.deleteMany({ _id: { $in: questionIdsToDelete } }).exec();
}

export default  {
	deleteQuestions
}