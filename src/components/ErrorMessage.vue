<script setup>
import { ref } from 'vue'

import useSystemMessages from '../stores/systemMessages.js'

const systemMessages = useSystemMessages()

const snackbar = ref(true)

</script>

<template>

<v-snackbar v-for="(error, n) in systemMessages.items" :timeout="-1" color="error" :key="n" rounded="pill" location="top" v-model="snackbar" :style="`top: ${n*60}px`">
    {{error.status === undefined? 'Failed to fetch CORS error, please contact support': error.status === 502 || error.status === 504 ? 'Request timed out. Retry later.' : error.message}} \ {{error.name}}
</v-snackbar>

</template>
