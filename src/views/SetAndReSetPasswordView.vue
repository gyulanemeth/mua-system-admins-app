<script setup>
import { defineComponent, watchEffect, ref } from 'vue'
import SetAndReSetPassword from '../components/SetAndReSetPassword.vue'
import stores from '../stores/index.js'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const formData = ref()
const store = stores().currentUserStore()
async function loadData(){
  if(route.name === "forgot-password-reset"){
    formData.value = {text:"Reset Password"}
  }
  else if(route.name === "accept-invitation"){
    formData.value = {text:"Set Password"}
  }
}

async function eventHandler(token, newPassword, newPasswordAgain){
  var res
  if(formData.value.text === "Reset Password"){
    res = await store.resetForgotPassword(token, newPassword, newPasswordAgain)
  }
  else if(formData.value.text === "Set Password"){
    res = await store.acceptInvitation(token, newPassword, newPasswordAgain)
  }
  if(res === 'success'){
    router.push('/')
  }
}


watchEffect(async () => {
  loadData()
})
</script>


<template>
  <SetAndReSetPassword :formData="formData" @buttonEvent="eventHandler" />
</template>
