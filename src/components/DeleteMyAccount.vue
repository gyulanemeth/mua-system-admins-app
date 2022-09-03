<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  data: Object
})

const route = useRoute()
const confirmPassword = computed(() => route.name === 'me')

const password = ref()
const dialog = ref()

const resetForm = () => {
  password.value = null
  dialog.value = false
}

</script>

<template>

<v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
        <v-btn v-if="confirmPassword" color="error" class="mt-10 text-white" v-bind="props">Delete</v-btn>
        <v-btn v-else color="grey" variant="text" class="ma-2" icon="mdi-delete" size="small" v-bind="props" />

    </template>
    <v-card class="d-flex flex-column justify-center">

        <v-card-text align="start">
            <v-col align="center" class="pb-10">
                <v-toolbar-title class="font-weight-bold text-error">Are you sure you want to delete “{{props.data.name}}”?</v-toolbar-title>
                <v-toolbar-title class="text-error">Doing so will fully delete this record forever, which cannot be reversed.</v-toolbar-title>
            </v-col>

            <v-row align="center" class="pb-10">
                <h3 class="font-weight-bold">Account Overview</h3>
                <v-divider />
            </v-row>

            <v-row align="center">
                <v-col>
                    <p class="font-weight-bold">Name</p>
                </v-col>
                <v-text-field hide-details density="compact" color="info" disabled class=" elevation-2 my-5 pt-2 pl-3 rounded" variant="plain" :placeholder="props.data.name" name="name" :value="props.data.name" type="text" required />
            </v-row>

            <v-row align="center">
                <v-col>
                    <p class="font-weight-bold">E-mail</p>
                </v-col>
                <v-text-field hide-details density="compact" color="info" disabled class=" elevation-2 my-5 pt-2 pl-3 rounded" variant="plain" :placeholder="props.data.email" name="email" :value="props.data.email" type="text" required />
            </v-row>
            <v-row align="center">
                <v-col>
                    <p class="font-weight-bold">Profile picture</p>
                </v-col>
                <v-col align="center">
                    <v-avatar class="elevation-3 " size="180">
                        <v-img src="https://selective.agency/wp-content/uploads/2018/02/placeholder-600x300.jpg" class="align-self-stretch" cover/>
                    </v-avatar>
                </v-col>
            </v-row>
            <v-col v-if="confirmPassword">
                <v-row align="center" class="py-10">
                    <h3 class="font-weight-bold">Please type your password to proceed with deleting your account:</h3>
                    <v-divider />
                </v-row>

                <v-row align="center">
                    <v-col>
                        <p class="font-weight-bold">Password</p>
                    </v-col>
                    <v-text-field hide-details density="compact" color="info" class=" elevation-2 my-5 pt-2 pl-3 rounded" variant="plain" placeholder="********" name="password" v-model="password" type="password" required />
                </v-row>
            </v-col>

        </v-card-text>
        <v-card-actions>
            <v-btn v-if="confirmPassword" color="error" @click="$emit('deleteEventHandler',{id:props.data._id, password});resetForm">Delete</v-btn>
            <v-btn v-else color="error" @click="$emit('deleteEventHandler',{id:props.data._id});resetForm">Delete</v-btn>
            <v-spacer />
            <v-btn color="info" @click="resetForm">close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

</template>
