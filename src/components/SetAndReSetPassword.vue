<script setup >
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import jwtDecode from 'jwt-decode'

const props = defineProps({
  formData: Object
})

const route = useRoute()
const operation = computed(() => route.name === 'accept-invitation' ? 'setPassword' : 'resetPassword')

const email = ref()
const data = ref({})
const cb = ref()

const title = window.config.title
const appIcon = window.config.appIcon


email.value = jwtDecode(route.query.token).user.email

</script>


<template>

<v-form class="d-flex flex-column justify-center align-center h-screen">
    <v-card elevation="0" class="w-25">
        <v-card-text align="center">
            <v-icon size="77" color="info" :icon="appIcon" />
        </v-card-text>
        <v-card-title class="justify-center py-0">
            <h4 class="text-h4"> {{title}} </h4>
        </v-card-title>
    </v-card>
    <v-card class="ma-2 pa-2  rounded-xl  elevation-2" width="30%">
        <v-card-text align="center" v-if="!cb">
            <h6 class="text-h6">{{props.formData.text}}</h6>

            <v-text-field v-if="operation === 'setPassword' " hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" name="email" type="text" :value="email" :placeholder="email" disabled required />

            <v-text-field v-if="operation === 'setPassword' " hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" placeholder="Your Name" name="name" label="Name" type="text" v-model="data.name" required />

            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" placeholder="********" name="newPassword" label="New Password" type="password" v-model="data.newPassword" required />

            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" placeholder="********" name="newPasswordAgain" label="Confirm New Password" type="password" v-model="data.newPasswordAgain" required
            />

            <v-checkbox label="I am human." color="info" value="I am human" hide-details></v-checkbox>

            <v-col v-if="operation === 'resetPassword'">
                <v-btn color="info" @click="$emit('resetPasswordEventHandler',{token:route.query.token,...data},(res)=>{cb = res})">{{props.formData.text}}</v-btn>
                <button hidden @click.enter.prevent="$emit('resetPasswordEventHandler',{token:route.query.token,...data},(res)=>{cb = res})" />
            </v-col>
            <v-col v-if="operation === 'setPassword'">
                <v-btn color="info" @click="$emit('setPasswordEventHandler',{token:route.query.token,...data})">{{props.formData.text}}</v-btn>
                <button hidden @click.enter.prevent="$emit('setPasswordEventHandler',{token:route.query.token,...data})" />
            </v-col>
        </v-card-text>
        <v-card-text align="center" v-if="cb">

            <h2 class="mt-4">Password changed</h2>
            <p class="mt-4">Your password has been changed. You will be automatically logged in in 5 seconds. Please
                <router-link tag="span" style="text-decoration: none; color: inherit;" to="/me" class="font-weight-bold">click here</router-link> if you are not redirected.</p>

        </v-card-text>

    </v-card>
</v-form>

</template>
