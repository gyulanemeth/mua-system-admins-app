<script setup >
import { ref } from 'vue'
import Settings from './AdminSettings.vue'
import ChangeEmail from './ChangeEmail.vue'
import ChangePassword from './ChangePassword.vue'
import MyDetails from './MyDetails.vue'

const props = defineProps({
  data: Object
})

const tab = ref()

const emit = defineEmits(['buttonEvent'])

function submitForm (data) {
  emit('buttonEvent', data)
}
</script>

<template>

<v-container class="elevation-4 rounded">
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

         <MyDetails @submit="submitForm" :name="props.data.name" />
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

<style scoped>
.shadow{
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.v-card--reveal {
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0,0,0,0.6);
  width: 100%;
  height: 100%;
  bottom: 0;
  transition: ease;
  opacity: .9;
}

.inputShadow {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);
}

</style>
