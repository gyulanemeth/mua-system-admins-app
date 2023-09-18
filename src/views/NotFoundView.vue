<script setup>
const title = window.config.title
const appIcon = window.config.appIcon
</script>

<template>
  <v-layout class="d-flex flex-wrap w-100 h-screen align-center justify-center">
    <div class="w-100 ma-auto d-flex flex-wrap align-center justify-center">
    <v-card elevation="0" class="w-100">
      <v-card-text align="center">
          <v-avatar size="100">
              <v-img :src="appIcon" cover></v-img>
          </v-avatar>
      </v-card-text>
      <v-card-title class="justify-center py-0">
          <h4 class="text-h4"> {{ title }} </h4>
      </v-card-title>
    </v-card>
    <v-card class="pa-5 ma-5 elevation-4" width="80%" max-width="800px">
        <v-card-text class="text-center">

        <v-icon icon="mdi-magnify-remove-outline" color="info" size="90"></v-icon>

      </v-card-text>
      <v-card-text class="text-center">

        <h1 class="text-info d-inline">{{ $t('notFoundView.title') }}</h1>
      </v-card-text>

      <v-card-text class="text-center">
          {{ $t('notFoundView.header') }}
      </v-card-text>

      <v-card-text class="text-center">
         {{ $t('notFoundView.bodyPart1') }} <a style="text-decoration: none; color: black;"
          href="/"><b> {{ $t('notFoundView.redirectBtn') }} </b></a> {{ $t('notFoundView.bodyPart2') }}
      </v-card-text>
    </v-card>
    </div>
  </v-layout>
</template>
