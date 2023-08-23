<template>
	<NavBar v-if="isAuthenticated" />
	<main>
		<BaseCardContainer class="card">
			<UserTodoList v-if="isAuthenticated"></UserTodoList>
			<UserAuth v-else>
				<AuthenticationForm />
			</UserAuth>
		</BaseCardContainer>
	</main>
</template>

<script setup>
	import UserAuth from './pages/auth/UserAuth.vue';
	import UserTodoList from './pages/todos/UserTodoList.vue';
	import BaseCardContainer from './layouts/BaseCardContainer.vue';
	import NavBar from './layouts/NavBar.vue';
	import AuthenticationForm from './components/AuthenticationForm/AuthenticationForm.vue';
	import { useAuth } from './composables/use-auth';
	import { onBeforeMount } from 'vue';

	const { isAuthenticated, tryLogin } = useAuth();

	onBeforeMount(() => {
		tryLogin();
	});
</script>
<style scoped>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f6f8fa;
	}

	@media screen and (max-width: 767px) {
		.card {
			width: 80%;
		}
	}

</style>
