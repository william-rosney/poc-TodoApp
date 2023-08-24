import { computed, ref, type Ref } from 'vue';
import AuthenticationService, {
	type Credentials,
	type User,
} from '../../services/AuthenticationService.js';

const userId: Ref<number | string | null> = ref(null);
const token: Ref<string | null> = ref(null);
const username: Ref<string | null> = ref(null);
const isAuthenticated = computed(() => {
	return !!token.value;
});

interface AuthData {
	username: string;
	password: string;
	authMode: string;
}

export function useAuth() {
	async function auth(payload: AuthData) {
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
		const _token = localStorage.getItem('token');
		const _userId = localStorage.getItem('userId');
		const _username = localStorage.getItem('username');

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
