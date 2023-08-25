import { computed, ref, type Ref } from 'vue';
import type { AuthData, Credentials, User } from '../types/auth-types';
import AuthenticationService from '../../services/AuthenticationService';

const userId = ref<number | string | null>(null);
const token = ref<string | null>(null);
const username = ref<string | null>(null);
const isAuthenticated = computed<boolean>(() => {
	return !!token.value;
});


export function useAuth() {
	async function auth(payload: AuthData): Promise<void> {
		console.log('Mode', payload.authMode);

		const credentials: Credentials = {
			username: payload.username,
			password: payload.password,
		};
		const response =
			payload.authMode === 'login'
				? ((await AuthenticationService.login(credentials)) as User)
				: ((await AuthenticationService.signup(credentials)) as User);

		localStorage.setItem('token', response.token);
		localStorage.setItem('userId', response.id as string);
		localStorage.setItem('username', response.username);
		userId.value = response.id;
		token.value = response.token;
		username.value = response.username;
	}

	function tryLogin() {
		const _token: string | null = localStorage.getItem('token');
		const _userId: string | null = localStorage.getItem('userId');
		const _username: string | null = localStorage.getItem('username');

		if (_token && _userId) {
			token.value = _token;
			userId.value = _userId;
			username.value = _username;
		}
	}

	function logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('username');
		token.value = null;
		userId.value = null;
		username.value = null;
	}

	return {
		tryLogin,
		logout,
		auth,
		isAuthenticated,
		userId,
		token,
		username,
	};
}
