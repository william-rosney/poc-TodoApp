<template>
	<form
		class="todo-form"
		@submit.prevent="submit">
		<input
			class="todo-input"
			type="text"
			placeholder="Add Todo"
			ref="input"
			v-model="newTodoTitle" />
		<button class="add-button">
			<svg
				class="add-svgIcon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24">
				<path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
			</svg>
		</button>
	</form>
</template>

<script setup>
	import { onMounted, ref } from 'vue';
	import { useTodos } from '../composables/use-todos';

	const { addTodo } = useTodos();
	const newTodoTitle = ref('');
	const input = ref(null);

	function submit(){
		if(newTodoTitle.value){
			addTodo(newTodoTitle.value);
			newTodoTitle.value = '';
			console.log("OKAY");
		}
		input.value.focus();
	}

	onMounted(() => {
		input.value.focus();
	});
</script>

<style scoped>
	.todo-form {
		display: flex;
		align-items: center;
		margin: 10px 0px;
		gap: 5px;
	}

	.todo-input {
		flex: 1;
		padding: 15px;
		border: 1px solid var(--primary-bg-color);
		border-radius: 25px;
		background-color: var(--primary-bg-color);
		font-size: 1rem;
	}

	.add-button {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--primary-btn-color);
		border: none;
		cursor: pointer;
		transition: background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add-svgIcon {
		width: 25px;
	}

	.add-svgIcon path {
		fill: white;
	}
	.add-button:hover {
		background-color: var(--secondary-btn-color);
	}

	@media screen and (max-width: 286px) {
		.todo-form{
			flex-direction: column;
		}
	}
</style>
