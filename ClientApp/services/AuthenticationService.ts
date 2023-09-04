import http from '../src/http-common';
import type { Credentials, User } from '../src/types/auth-types';


class AuthenticationService {
	baseUrl: string = '/AppUser';

	async signup(credentials: Credentials): Promise<User | undefined> {
		try {
			const response = await http.post(`${this.baseUrl}/Register`, credentials);
			console.log('Register successful', response);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	async login(credentials: Credentials): Promise<User | undefined> {
		try {
			const response = await http.post(`${this.baseUrl}/Login`, credentials);
			console.log('Login successful', response);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

export default new AuthenticationService();
