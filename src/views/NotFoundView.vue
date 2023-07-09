<script setup>
import { ref } from 'vue'

const countDown = ref(5)
function redirect () {
  if (countDown.value === 0) {
    window.location.href = '/'
  } else {
    countDown.value = countDown.value - 1
  }
};

setInterval(redirect, 1000)
</script>

<template>
  <v-layout class="d-flex flex-wrap w-100 align-center justify-center">
    <v-card class="pa-5 ma-5 elevation-4 w-50">
        <v-card-text class="text-center">
      
        <v-icon icon="mdi-magnify-remove-outline" color="info" size="90"></v-icon>

      </v-card-text>
      <v-card-text class="text-center">
       
        <h1 class="text-info d-inline">{{ $t('notFoundView.title') }}</h1>
      </v-card-text>
      <v-card-text class="text-center">
        <v-alert class="w-100" color="info" prominent>
          {{ $t('notFoundView.header') }}
        </v-alert>

      </v-card-text>
      <v-card-text class="text-center">
        {{ $t('notFoundView.autoRedirectMessage') }} {{ countDown }} {{ $t('notFoundView.bodyPart1')
        }}<br /> {{ $t('notFoundView.bodyPart2') }} <a style="text-decoration: none; color: black;"
          href="/"><b> {{ $t('notFoundView.redirectBtn') }} </b></a> {{
            $t('notFoundView.bodyPart3') }}

      </v-card-text>
    </v-card>
  </v-layout>
</template>
