<script setup>

import CreateAccount from '../components/CreateAccount.vue'
import stores from '../stores/index.js'

const store = stores().accountStore()

async function eventHandler (data) {
  await store.createOne(data)
}

</script>

<template>
  <CreateAccount @buttonEvent="eventHandler" />
</template>
