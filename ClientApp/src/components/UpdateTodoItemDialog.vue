<template>
    <dialog class="update-dialog" :open="isOpen">
        <form  @submit.prevent="saveUpdates">
            <input type="text" v-model="todo.title">
            <button>Save</button>
        </form>
    </dialog>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import TodoAppDataService from '../../services/TodoAppDataService';
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

    const emits = defineEmits(['updateTodo', 'close']);

    const todo = reactive(props.targetTodo);

    function closeDialog(){
        console.log('closeDialog()')
        emits('close')
    }
    
    function saveUpdates(){
        console.log("saveUpdates()", todo);
        emits('updateTodo', todo);
        closeDialog();
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