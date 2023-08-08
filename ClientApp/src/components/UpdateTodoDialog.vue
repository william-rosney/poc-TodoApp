<template>
    <dialog class="update-dialog" :open="isOpen">
        <form  @submit.prevent="saveUpdates">
            <input type="text" v-model="todo.title">
            <button>Save</button>
        </form>
    </dialog>
</template>

<script setup>
    import { ref } from 'vue';
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

    function saveUpdates(){
        console.log("saveUpdates()", todo.value);
        updateTodo(todo.value);
        closeDialog();
    }

    function closeDialog(){
        console.log('closeDialog()');
        emits('close');
    }
</script>

<style scoped>
    .update-dialog {
        position: fixed;
        top: 20vh;
        left: 30%;
        width: 40%;
        background-color: white;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.26);
        padding: 1rem;
    }
</style>