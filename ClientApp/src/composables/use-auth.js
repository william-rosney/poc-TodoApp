import { computed, onBeforeMount, ref } from 'vue';
import AuthenticationService from '../../services/AuthenticationService.js';

const userId = ref(null);
const token = ref(null);
const username = ref(null);
const isAuthenticated = computed(() => {
	return !!token.value;
});

export function useAuth() {
	async function auth(payload) {
		console.log('Mode', payload.mode);
		const response =
			payload.mode === 'login'
				? await AuthenticationService.login(payload)
				: await AuthenticationService.signup(payload);

		localStorage.setItem('token', response.token);
		localStorage.setItem('userId', response.id);
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
