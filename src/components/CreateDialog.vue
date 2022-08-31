<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  name: String,
  header: String,
  inputs: Array,
  btnTitle: String
})

const route = useRoute()
const operation = computed(() => route.name === 'admins' ? 'Invite' : 'Create')

const dialog = ref(false)
const data = ref({})
const cb = ref()

const resetForm = () => {
  Object.keys(data.value).forEach(key => {
    data.value[key] = null
  })
}

</script>

<template>

<v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
        <v-btn variant="outlined" color="info" v-bind="props">
            {{btnTitle}}
        </v-btn>
    </template>
    <v-card min-width="800" class="d-flex flex-column justify-center">
        <v-toolbar color="white" align="center">
            <v-toolbar-title class="font-weight-bold">{{props.header}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text align="start">
            <v-row align="center" v-for="(input, i) in props.inputs" :key="i">
                <v-col cols="4">
                    <p class="font-weight-bold">{{input.label}}</p>
                </v-col>
                <v-col cols="8" align='center'>
                    <v-card v-if="input.type === 'file'" class="mx-2 my-5 pa-2" min-width="275">
                        <v-img src="https://selective.agency/wp-content/uploads/2018/02/placeholder-600x300.jpg" height="150px" cover></v-img>
                        <v-card-title class="justify-center py-0">
                            <v-btn variant="text" icon="mdi-image-plus" color="grey-lighten-1" type="file"></v-btn>
                        </v-card-title>
                        <p>{{input.placeholder}}</p>
                    </v-card>
                    <v-text-field v-else hide-details density="compact" class=" elevation-2 my-5 pl-3 rounded" color="info" variant="plain" :placeholder="input.placeholder" :name="input.name" v-model="data[input.name]" :type="input.type" required />
                </v-col>
            </v-row>
            <v-row v-if="cb" class="justify-center">
                <p class="font-weight-bold">Invitation sent.</p>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn color="info" v-if="operation === 'Create'" @click="$emit('createEventHandler',data, ()=>{dialog=false}); resetForm() ">{{operation}}</v-btn>
            <v-btn color="info" v-else-if="cb" @click="cb=null">Invite ANOTHER</v-btn>
            <v-btn color="info" v-else @click="$emit('inviteEventHandler',data, (res)=>{cb = res; resetForm()})">{{operation}}</v-btn>
            <v-btn color="info" @click="dialog=false; resetForm()">close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

</template>
