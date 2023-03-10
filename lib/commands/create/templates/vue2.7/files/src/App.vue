<template>
    <div>{{greeting}}</div>
</template>

<script setup>
import { ref } from 'vue'
const greeting = ref('Hello world!')
</script>
