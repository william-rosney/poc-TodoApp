<template>
    <div class="todo-item">
      <label class="container">
        <input type="checkbox" v-model="props.todo.isCompleted">
        <div class="checkmark"></div>
      </label>
        <span class="todo-content" :class="{completed: props.todo.isCompleted}" @click="() => isDialogOpened = true">{{ props.todo.title }}</span>
        <button @click="deleteTodo(props.todo.id)">
          <svg class="delete-svgIcon" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
          </svg>
        </button>
        <UpdateTodoDialog v-if="isDialogOpened"
            :target-todo="props.todo" 
            :is-open="isDialogOpened"
            @update-todo="updateTodo"
            @close="closeDialog" />
    </div>
</template>

<script setup>
import { onBeforeUpdate, onMounted, onUnmounted, ref, watch } from 'vue';
import { useTodos } from '../composables/use-todos';
import UpdateTodoDialog from './UpdateTodoDialog.vue';

const { deleteTodo, updateTodo } = useTodos();

    const props = defineProps({
        todo: {
          type: Object,
          required: true
        }
    });

    watch(() => props.todo.isCompleted, () => {
      console.log("TodoItem watch()");
      updateTodo(props.todo);
    });
    const isDialogOpened = ref(false);
    
    function closeDialog(){
      console.log('CloseDialog() TodoItem')
      isDialogOpened.value = false;
    }
    
    onUnmounted(() => {
      updateTodo(props.todo);
    })
</script>


<style scoped>
    .todo-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border: none;
    border-radius: 4px;
    box-shadow: 2px 2px 7px 0 rgb(0, 0, 0, 0.2);
    margin: 0 auto 10px auto;
    font-size: 1rem;
    font-weight: 400;
    color: #6a737d;
    width: 90%;
  }

  .todo-item input[type="checkbox"] {
    margin-right: 10px;
  }
  .todo-content {
    overflow-wrap: break-word;
    width: 85%;
  }
  .completed {
    text-decoration: line-through;
    color: var(--secondary-font-color);
  }

  .todo-item button {
    background-color: transparent;
    border: none;
    color: #cb2431;
    cursor: pointer;
    margin-left: auto;
    transition: color 0.2s;
  }

  .todo-item button:hover {
    color: #d73a49;
  }

  .container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 0.8rem;
  user-select: none;
  margin-right: 10px;
}

/* Create a custom checkbox */
.checkmark {
  --clr: #0B6E4F;
  border: 1px solid #CCC;
  position: relative;
  top: 0;
  left: 0;
  height: 1.3em;
  width: 1.3em;
  background-color: white;
  border-radius: 50%;
  transition: 300ms;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: var(--clr);
  border: 1px solid var(--clr);
  animation: pulse 300ms ease-in-out;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 0.45em;
  top: 0.25em;
  width: 0.25em;
  height: 0.5em;
  border: solid #E0E0E2;
  border-width: 0 0.15em 0.15em 0;
  transform: rotate(45deg);
}

.delete-svgIcon {
  width: 15px;
}

.delete-svgIcon path {
  fill: var(--primary-delete-icon-color);
  transition: fill 0.2s ease;
}

.delete-svgIcon path:hover {
  fill: var(--secondary-delete-icon-color);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 #0B6E4F90;
    rotate: 20deg;
  }

  50% {
    rotate: -20deg;
  }

  75% {
    box-shadow: 0 0 0 10px #0B6E4F60;
  }

  100% {
    box-shadow: 0 0 0 13px #0B6E4F30;
    rotate: 0;
  }
}
</style>