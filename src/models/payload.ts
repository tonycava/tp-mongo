export type LoginBodyPayload = {
	email: string,
	password: string
}

export type RegisterBodyPayload = {
	email: string,
	name: string,
	password: string,
	verifyPassword: string
}

export type Region = {
	name: string;
	population: number;
	numberOfInfected: number;
	numberOfDeath: number;
	opacity: string;
	percentDeath: number,
	percentInfected: number
};

export type AuthResponseData = {
	token: string
}

export type UpgradePayload = {
	userId: string
	upgradeId: string
}

export type JWTPayload = {
	id: string;
	username: string;
}

export type User = JWTPayload

export type CreateUserPayload = {
	email: string,
	name: string,
	password: string
}