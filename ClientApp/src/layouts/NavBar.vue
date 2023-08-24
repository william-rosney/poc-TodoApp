<template>
	<nav class="navbar">
		<span>Welcome {{ username }}</span>
		<button
			class="logout-btn"
			@click="onLogout">
			Logout
		</button>
	</nav>
</template>

<script setup lang="ts">
	import { useAuth } from '../composables/use-auth';
	import { useTodos } from '../composables/use-todos';

	const { logout, username } = useAuth();
	const { todos } = useTodos();

	const onLogout = () => {
		todos.value = [];
		logout();
	};
</script>

<style scoped>
	.navbar {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 20px;
		background-color: var(--primary-bg-color);
		padding: 10px;
	}

	.logout-btn {
		align-self: center;
		font-size: 1rem;
		padding: 10px;
		width: 100px;
		border-radius: 10px;
		border: 2px solid var(--primary-btn-color);
		background-color: var(--primary-btn-color);
		color: #fff;
	}
	.logout-btn:hover {
		cursor: pointer;
		background-color: var(--secondary-btn-color);
		border: 2px solid var(--secondary-btn-color);
	}
</style>
