<script setup >
import { ref } from 'vue'

import { useCurrentUserStore } from '../stores/index.js'

const userStore = useCurrentUserStore()

const email = ref('')
const password = ref('')

const title = window.config.title
const appIcon = window.config.appIcon

async function submit () {
  await userStore.login(email.value, password.value)
}

</script>

<template>
<v-form class="d-flex flex-column justify-center align-center h-screen">
    <v-card elevation="0" class="w-25">
        <v-card-text align="center">
            <v-avatar size="80" >
              <v-img :src="appIcon" cover></v-img>
            </v-avatar>
        </v-card-text>
        <v-card-title class="justify-center py-0">
            <h4 class="text-h4">  {{title}} </h4>
        </v-card-title>
    </v-card>
    <v-card class="ma-2 pa-2  rounded-xl  elevation-2" width="30%">
        <v-card-text align="center">
            <h6 class="text-h6">{{ $t('adminLogin.header') }}</h6>
            <v-text-field hide-details density="compact" data-test-id="login-emailField" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="email" :label="$t('adminLogin.emailLabel')" id="email" type="email"
             :placeholder="email ||'your@email.com'"
             :value="email"
             @update:modelValue="res => email = res.replace(/[^a-z0-9@ \.,_-]/gim, '')"
             required />
            <v-text-field hide-details density="compact" data-test-id="login-passwordField" class="elevation-2 my-5 pt-2 pl-3 rounded" color="info"
            variant="plain" name="password" :label="$t('adminLogin.passwordLabel')" id="password" type="password"
            :placeholder="password ||'********'"
            :value="password"
            @update:modelValue="res => password = res.replace(/[^a-z0-9!@#$%^&* \.,_-]/gim, '')"
            active required />
            <v-btn color="info" data-test-id="login-submitBtn" @click="submit">{{ $t('adminLogin.submitBtn') }}</v-btn>
            <p class="mt-4 pa-4">{{ $t('adminLogin.resetPasswordMsg') }}
                <router-link data-test-id="login-resetPasswordBtn" style="text-decoration: none; color: inherit;" class="font-weight-bold" to="/forgot-password">{{ $t('adminLogin.resetPasswordBtn') }}</router-link>
            </p>
            <button hidden @click.enter.prevent="submit" />
        </v-card-text>
    </v-card>
</v-form>
</template>
