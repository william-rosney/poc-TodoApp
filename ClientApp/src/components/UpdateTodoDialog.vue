<template>
    <div class="backdrop" v-if="isOpen"></div> 
    <Transition name="modal">
        <dialog class="update-dialog" open v-if="isOpen">
            <h2>Todo details</h2>
            <form  @submit.prevent="saveUpdates">
                <input type="text" v-model="todo.title" ref="input">
                <div class="btn-row">
                    <button class="btn close-btn" @click="closeDialog">Close</button>
                    <button class="btn save-btn">Save</button>
                </div>
            </form>
        </dialog>
    </Transition>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useTodos } from '../composables/use-todos';
    const props = defineProps({
        targetTodo : {
            type: Object,
            required: true
        },
        isOpen : {
            type: Boolean,
            required: true
        }
    });

    const { updateTodo } = useTodos()
    const emits = defineEmits(['close']);

    //Use spread syntax to create a new object with a different pointer reference
    const todo = ref({...props.targetTodo});
    const input = ref(null);
    function saveUpdates(){
        console.log("saveUpdates()", todo.value);
        updateTodo(todo.value);
        closeDialog();
    }

    function closeDialog(){
        console.log('closeDialog()');
        emits('close');
    }

    // onMounted(() => {
    //     input.value.focus();
    // })
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
    position: fixed;
    top: 30vh;
    width: 30rem;
    left: calc(50% - 15rem);
    margin: 0;
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
  animation: popout 0.1s ease-in;
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
@keyframes popout {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    to {
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
    }
}
</style>
