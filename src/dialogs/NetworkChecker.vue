<script setup>
import { ref } from 'vue'

const snackbar = ref(false)
const status = ref('offline')

window.addEventListener('offline', (e) => {
  status.value = 'offline'
  snackbar.value = true
})

window.addEventListener('online', async (e) => {
  status.value = 'online'
  await new Promise(resolve => setTimeout(resolve, 5000))
  snackbar.value = false
})

</script>

<template>
   <v-snackbar
    v-model="snackbar"
    location="bottom right"
    :timeout="-1"
    :close-on-back="false"
    vertical
    color="white"
  >
      <v-card-text >
        <v-row>
            <v-col cols="2">
                <v-icon size="50" :color="status === 'offline'?'error':'success'"  icon="mdi-information-outline" />
            </v-col>
            <v-col>
                <p class="font-weight-bold"> {{$t(`networkChecker.${status}.header`)}}</p>
                <p > {{$t(`networkChecker.${status}.body`)}}</p>
            </v-col>
        </v-row>
    </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn @click="snackbar = false" :color="status === 'offline'?'error':'success'" width="100" variant="elevated" >
          {{$t('networkChecker.closeBtn')}}
        </v-btn>
      </v-card-actions>
  </v-snackbar>
</template>
