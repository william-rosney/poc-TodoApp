import http from '../src/http-common';

class AuthenticationService {
	baseUrl = '/AppUser';

	async signup(payload) {
		try {
			const _payload = {
				username: payload.username,
				password: payload.password,
			};
			const response = await http.post(`${this.baseUrl}/Register`, _payload);
			console.log('Register successful', response);
			return response.data;
		} catch (error) {
			console.error('errorMessage', error.response.data);
			throw error;
		}
	}
	async login(payload) {
		try {
			const _payload = {
				username: payload.username,
				password: payload.password,
			};
			const response = await http.post(`${this.baseUrl}/Login`, _payload);
			console.log('Login successful', response);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

export default new AuthenticationService();
