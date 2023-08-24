<template>
	<div
		class="backdrop"
		v-if="isOpen"
		@click="closeDialog"></div>
	<Transition name="modal">
		<dialog
			class="update-dialog"
			open
			v-if="props.isOpen">
			<h2>Todo details</h2>
			<form @submit.prevent="saveUpdates">
				<input
					type="text"
					v-model="todo.title"
					ref="input" />
				<div class="btn-row">
					<button
						class="btn close-btn"
						type="button"
						@click="closeDialog">
						Close
					</button>
					<button class="btn save-btn">Save</button>
				</div>
			</form>
		</dialog>
	</Transition>
</template>

<script setup>
	import { ref, onUpdated } from 'vue';
	import { useTodos } from '../../composables/use-todos';
	const props = defineProps({
		targetTodo: {
			type: Object,
			required: true,
		},
		isOpen: {
			type: Boolean,
			required: true,
		},
	});

	const { updateTodo } = useTodos();
	const emits = defineEmits(['close']);

	//Use spread syntax to create a new object with a different pointer reference
	const todo = ref({ ...props.targetTodo });
	const input = ref(null);
	function saveUpdates() {
		if(todo.value.title) {
			console.log('saveUpdates()', todo.value);
			updateTodo(todo.value);
			closeDialog();
		}
	}

	function closeDialog() {
		console.log('closeDialog()');
		emits('close');
	}
	onUpdated(() => {
		if(props.isOpen){
			input.value.focus();
			todo.value = {...props.targetTodo};
			console.log("Modal update");
		}
	})
</script>

<style scoped>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.75);
	}
	.update-dialog {
		position: absolute;
		/* top: 50%;
		left: calc(30%); */
		width: 30rem;
		/* margin: 0 auto; */
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 8px;
		padding: 1rem;
		background-color: white;
		z-index: 100;
		border: none;
		/* animation: popup 0.3s ease-in-out; */
	}

	h2 {
		font-weight: 700;
		color: var(--primary-font-color);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	form input {
		flex: 3;
		font-size: 1.3rem;
		padding: 10px;
		border: 2px solid var(--primary-bg-color);
		border-radius: 5px;
	}
	.btn-row {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
	}
	.btn {
		font-size: 1rem;
		padding: 10px;
		width: 100px;
		border-radius: 10px;
	}

	.save-btn {
		border: 2px solid var(--primary-btn-color);
		background-color: var(--primary-btn-color);
		color: #fff;
	}

	.save-btn:hover {
		border: 2px solid var(--secondary-btn-color);
		background-color: var(--secondary-btn-color);
	}

	.close-btn {
		border: 2px solid var(--primary-btn-color);
		background-color: #fff;
		color: var(--primary-btn-color);
	}
	.close-btn:hover {
		border: 2px solid var(--secondary-btn-color);
		color: var(--secondary-btn-color);
	}
	.modal-enter-active {
		animation: popUp 0.3s ease-out;
	}
	.modal-leave-active {
		animation: popOut 0.1s ease-in;
	}

	@keyframes popUp {
		from {
			opacity: 0;
			transform: translateY(-50px) scale(0.9);
		}

		to {
			opacity: 1;
			transform: translateY(0px) scale(1);
		}
	}
	@keyframes popOut {
		from {
			opacity: 1;
			transform: translateY(0) scale(1);
		}

		to {
			opacity: 0;
			transform: translateY(-50px) scale(0.9);
		}
	}

	@media screen and (min-width: 587px) and (max-width: 1023px) {
	}
	@media screen and (max-width: 586px) {
		.update-dialog {
			width: 90%;

		}
	}
</style>
