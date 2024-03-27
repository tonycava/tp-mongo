import type { Question, Survey } from '@models/database';

export enum Options {
	TEXT = 'text',
	MULTIPLE_CHOICE = 'multiple-choice',
}

export const convertIndexToOrdinal = (index: number) => {
	if (index < 0) {
		return 'Negative indexes are not supported';
	} else if (index === 0) {
		return 'first';
	} else if (index === 1) {
		return 'second';
	}
	return index + getOrdinalSuffix(index);
};

function getOrdinalSuffix(number: number) {
	const lastDigit = number % 10;
	const lastTwoDigits = number % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
		return 'th';
	} else if (lastDigit === 1) {
		return 'st';
	} else if (lastDigit === 2) {
		return 'nd';
	} else if (lastDigit === 3) {
		return 'rd';
	}
	return 'th';
}



export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type Questions = [string, string][]
type OrganizedQuestions =
	{ type: 'multiple-choice'; question: string; options: string[] } |
	{ type: 'text'; question: string }

export const organizeQuestions = (data: Questions): OrganizedQuestions[] => {
	const questions = data.reduce<any>((acc, [key, value]) => {
		const [prefix, number] = key.split(/(\d+)/).filter(Boolean);

		if (prefix === 'question') {
			if (acc[number]) {
				acc[number].question = value;
			} else {
				acc[number] = { question: value, type: 'text' };
			}
		} else if (prefix === 'question-type') {
			acc[number].type = value as Options.MULTIPLE_CHOICE | Options.TEXT;
		} else if (prefix === 'option') {
			// @ts-ignore
			acc[number].options = acc[number].options || [];
			// @ts-ignore
			if (!acc[number].options.includes(value)) {
				// @ts-ignore
				acc[number].options.push(value);
			}
		}

		return acc;
	}, {});

	return Object.values(questions);
};

export const formatSurvey = (survey: Survey) => {
	return {
		title: survey.title,
		questions: survey.questions.map((question: Question) => {
		return {
			id: question._id.toString(),
			question: question.question,
			type: question.type,
			answers: question.options
		};
	})
	};
}