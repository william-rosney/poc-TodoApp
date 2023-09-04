export interface Credentials {
	username: string;
	password: string;
}

export interface User {
	id: number | string;
	username: string;
	token: string;
}

export interface AuthData {
	username: string;
	password: string;
	authMode: string;
}