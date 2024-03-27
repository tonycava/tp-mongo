import { User } from '$lib/server/db';
import type { AuthResponseData, LoginBodyPayload, RegisterBodyPayload } from '@models/payload';
import type { TPMongoResponseData } from '$lib/server/response';
import axios, { type AxiosResponse } from 'axios';

const getUserByName = (username: string): Promise<any | null> => {
	return User.where('username', username).findOne().exec();
};

const createUser = (user: Pick<any, 'username' | 'password'>): Promise<any> => {
	return User.create(user);
};

const login = (body: LoginBodyPayload): Promise<AxiosResponse<TPMongoResponseData<AuthResponseData>>> => {
	return axios.post(`http://localhost:3000/api/auth/login`, body);
};

const register = (body: RegisterBodyPayload): Promise<AxiosResponse<TPMongoResponseData<AuthResponseData>>> => {
	return axios.post(`http://localhost:3000/api/auth/register`, body);
};

export default {
	getUserByName,
	createUser,
	register,
	login
};