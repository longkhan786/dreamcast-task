<script setup lang="ts">
import { ref } from 'vue';

const users = ref(['User1', 'User2', 'User3']); // Reactive variable
</script>

<template>
    <div>
        <h1>Users</h1>
        <ul>
            <li v-for="user in users" :key="user" class="blue-text">{{ user }}</li>
        </ul>
    </div>
</template>

<style scoped>
.blue-text {
    color: blue;
}
</style>
