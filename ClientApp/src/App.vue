<template>
	<NavBar v-if="isAuthenticated" />
	<main>
		<BaseCardContainer class="card">
			<UserTodoList v-if="isAuthenticated"></UserTodoList>
			<UserAuth v-else>
				<AuthenticationForm class="auth"/>
			</UserAuth>
		</BaseCardContainer>
	</main>
</template>

<script setup lang="ts">
	import UserAuth from './pages/auth/UserAuth.vue';
	import UserTodoList from './pages/todos/UserTodoList.vue';
	import BaseCardContainer from './components/Base/BaseCardContainer.vue';
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
		.auth {
			margin-left: auto;
			margin-right: auto;
			width: 95%;
		}
	}

</style>
