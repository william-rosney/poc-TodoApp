<template>
	<DataLoader v-if="isLoading" />
	<form
		v-else
		class="auth-form"
		@submit.prevent="submitForm">
		<h2>{{ formTitleCaption }}</h2>
		<label for="username">Username</label>
		<input
			type="text"
			name="username"
			v-model="username"
			class="form-input"
			:class="{ invalid: !isFormValid }" />
		<label for="password">Password</label>
		<input
			type="password"
			v-model="password"
			class="form-input"
			:class="{ invalid: !isFormValid }" />
		<span
			v-if="!!error"
			class="error-msg"
			>{{ error.response.data }}</span
		>
		<button>{{ submitButtonCaption }}</button>
		<a
			href="#"
			@click="switchAuthMode"
			>{{ switchAuthModeCaption }}</a
		>
	</form>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { useAuth } from '../../composables/use-auth';
	import DataLoader from '../Loader/DataLoader.vue';

	const authMode = ref('login');
	const isFormValid = ref(true);
	const username = ref('');
	const password = ref('');
	const isLoading = ref(false);
	const error = ref('');
	const { auth } = useAuth();

	const submitButtonCaption = computed(() => {
		return authMode.value === 'login' ? 'Sign In ' : 'Sign up';
	});
	const formTitleCaption = computed(() => {
		return authMode.value === 'login' ? 'Sign In !' : 'Welcome !';
	});

	const switchAuthModeCaption = computed(() => {
		return authMode.value === 'login'
			? 'Sign up to register'
			: 'Already an account ? Sign in ';
	});

	function switchAuthMode() {
		if (authMode.value === 'login') {
			authMode.value = 'register';
		} else {
			authMode.value = 'login';
		}
	}

	async function submitForm() {
		isFormValid.value = true;
		if (username.value === null || password.value.length < 2) {
			isFormValid.value = false;
			console.log('Form not valid');
			return;
		}
		isLoading.value = true;
		try {
			console.log('Form valid');
			await auth({
				username: username.value,
				password: password.value,
				mode: authMode.value,
			});
		} catch (err) {
			error.value = err;
			console.log('ERROR Form', err);
		}
		isLoading.value = false;
	}
</script>

<style scoped>
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 400px;
	}

	.auth-form h2 {
		align-self: center;
	}

	.form-input {
		font-size: 1.3rem;
		padding: 10px;
		border: 2px solid var(--primary-bg-color);
		border-radius: 5px;
	}

	.invalid {
		border: 2px solid rgba(255, 0, 0, 0.641);
	}

	.auth-form button {
		align-self: center;
		font-size: 1rem;
		padding: 10px;
		width: 100px;
		border-radius: 10px;
		border: 2px solid var(--primary-btn-color);
		background-color: var(--primary-btn-color);
		color: #fff;
	}
	.auth-form button:hover {
		cursor: pointer;
		background-color: var(--secondary-btn-color);
		border: 2px solid var(--secondary-btn-color);
	}

	.auth-form a {
		align-self: center;
	}

	.error-msg {
		font-size: 0.8rem;
		color: rgba(255, 0, 0, 0.698);
	}
</style>
