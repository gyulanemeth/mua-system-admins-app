<script setup>
import { ref } from 'vue'

const props = defineProps({
  formData: Object
})

const cb = ref()
const data = ref('')
const title = window.config.title
const appIcon = window.config.appIcon

</script>


<template>

<v-form class="d-flex flex-column justify-center align-center h-screen">
    <v-card elevation="0" class="w-25">
        <v-card-text align="center">
            <v-icon size="77" color="info" :icon="appIcon" />
        </v-card-text>
        <v-card-title class="justify-center py-0">
            <h4 class="text-h4">  {{title}} </h4>
        </v-card-title>
    </v-card>
    <v-card class="ma-2 pa-2  rounded-xl  elevation-2" width="30%">
        <v-card-text align="center">
            <h6 class="text-h6">{{props.formData.text}}</h6>

            <v-text-field hide-details density="compact" class=" elevation-2 my-5 pt-2 pl-3 rounded" color="info" variant="plain" placeholder="your@email.com" :name="props.formData.inputText" :label="props.formData.inputText" :type="props.formData.inputType" :disabled="cb"
            v-model="data" required />
            <v-checkbox v-if="props.formData.text === 'Password recovery' && !cb" label="I am human." color="info" value="I am human" hide-details></v-checkbox>
            <div v-if="!cb">
                <v-btn color="info" @click="$emit('passwordRecoveryEventHandler',data, (res)=>{cb=res})">{{props.formData.btnText}}</v-btn>
                <button hidden @click.enter.prevent="$emit('passwordRecoveryEventHandler',data, (res)=>{cb=res})" />
            </div>
            <div v-if="cb">

                <p class="mt-4">We have sent you an e-mail with instructions on how to reset your password. Please check your inbox.</p>
                <v-btn color="white" class="mt-4" to="/">continue</v-btn>
            </div>
        </v-card-text>

    </v-card>
</v-form>

</template>
