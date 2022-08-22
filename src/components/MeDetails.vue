<script setup >
import { ref } from 'vue'

import Settings from './AdminSettings.vue'
import ChangeEmail from './ChangeEmail.vue'
import ChangePassword from './ChangePassword.vue'
import MyDetails from './MyDetails.vue'

const emit = defineEmits(['buttonEvent'])
const props = defineProps({
  data: Object
})

const changeTab = (tabId) => {
  tab.value = tabId
}

function submitForm (data, cb) {
  emit('buttonEvent', data, cb)
}

const tab = ref()

</script>

<template>

<v-container class="elevation-0 mx-6 pt-0  rounded">
  <v-layout class="d-flex flex-wrap align-end justify-end">

  <p class="text-h4 pa-2">{{props.data.name}}</p>
  <p class="text-h7 font-weight-bold pa-2 ">Administrator</p>
  <p class="text-h7 pa-2">{{props.data.email}}</p>

<v-spacer />
</v-layout>

    <v-layout class="d-flex flex-wrap">
      <v-card class="w-100">
      <v-tabs
     v-model="tab"
   >
     <v-tab value="one" color="info" prepend-icon="mdi-account" >MY details</v-tab>
     <v-tab value="two" color="info" prepend-icon="mdi-lock">Change password</v-tab>
     <v-tab value="three" color="info" prepend-icon="mdi-at">Change e-mail</v-tab>
     <v-tab value="four" color="info" prepend-icon="mdi-cog">Settings</v-tab>

   </v-tabs>

   <v-card-text>
     <v-window v-model="tab">
       <v-window-item value="one">

         <MyDetails @submit="submitForm" @changeTab="changeTab" :email="props.data.email" :name="props.data.name" />
       </v-window-item>

              <v-window-item value="two">
                <ChangePassword @submit="submitForm" />
              </v-window-item>

       <v-window-item value="three">
                <ChangeEmail @submit="submitForm" :email="props.data.email" />
       </v-window-item>

       <v-window-item value="four">
         <Settings @submit="submitForm" :data="props.data" />
       </v-window-item>
     </v-window>
   </v-card-text>
 </v-card>

</v-layout>
</v-container>
</template>
