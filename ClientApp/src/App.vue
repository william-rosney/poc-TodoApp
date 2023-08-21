<template>
	<main>
		<BaseCardContainer>
			<UserTodoList v-if="false"></UserTodoList>
			<UserAuth v-else/>
		</BaseCardContainer>
	</main>
</template>

<script setup>
	import UserAuth from './pages/auth/UserAuth.vue';
	import UserTodoList from './pages/todos/UserTodoList.vue';
	import BaseCardContainer from './layouts/BaseCardContainer.vue';
</script>
<style scoped>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f6f8fa;
	}
</style>
