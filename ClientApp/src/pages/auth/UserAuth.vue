<template>
	<form class="auth-form">
		<h2>{{ formTitleCaption }}</h2>
		<label for="username">Username</label>
		<input
			type="text"
			name="username" />
		<label for="password">Password</label>
		<input type="password" />
		<button>{{ submitButtonCaption }}</button>
		<a href="#" @click="switchAuthMode">{{switchAuthModeCaption}}</a>
	</form>
</template>

<script setup>
	import { computed, ref } from 'vue';

	const isRegistered = ref(true);
    
    const submitButtonCaption = computed(() => {
        return isRegistered.value ? 'Sign In ' : 'Sign up ';
    });
	const formTitleCaption = computed(() => {
        return isRegistered.value ? 'Sign In !' : 'Welcome !';
	});

    const switchAuthModeCaption = computed(() => {
        return isRegistered.value ? 'Sign up to register' : 'Already an account ? Sign in ';
    });

    function switchAuthMode(){
        isRegistered.value = !isRegistered.value;
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

	.auth-form input {
		font-size: 1.3rem;
		padding: 10px;
		border: 2px solid var(--primary-bg-color);
		border-radius: 5px;
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

	.auth-form a {
		align-self: center;
	}
</style>
