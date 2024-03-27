import type { ObjectId } from 'mongoose';

export type Question = {
	_id: ObjectId
	question: string;
	type: string;
	options: string[];
}

export type Answer = {
	options: string[];
}

export type User = {
	username: string;
	password: string;
	surveys: Survey[];
}

export type Survey = {
	title: string;
	questions: Question[];
	userId: ObjectId;
}