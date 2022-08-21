<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import jwtDecode from 'jwt-decode'

const route = useRoute()
const props = defineProps({
  formData: Object
})

const email = ref()
email.value = jwtDecode(route.query.token).user.email

const data = ref({})

</script>

<template>
  <v-form class="d-flex flex-column justify-center align-center h-screen">
    <v-card elevation="0" class="w-25">
      <v-card-text align="center" >
          <v-icon size="77" color="info" icon="mdi-weather-hurricane" />
      </v-card-text>
      <v-card-title class="justify-center py-0">
        <h3>  Administration Panel </h3>
      </v-card-title>
    </v-card>
  <v-card class="ma-2 pa-2  rounded-xl  elevation-2" width="30%">
    <v-card-text align="center">
      <h4 class="m-4 " >{{props.formData.text}}</h4>

      <v-text-field v-if="props.formData.text === 'Set Password' "
       hide-details
      density="compact"
      class=" elevation-2 my-5 pt-2 pl-3 rounded"
      color="info"
      variant="plain"
      name="email"
      type="text"
      :value="email"
      :placeholder="email"
      disabled
      required />

      <v-text-field v-if="props.formData.text === 'Set Password' "
       hide-details
      density="compact"
      class=" elevation-2 my-5 pt-2 pl-3 rounded"
      color="info"
      variant="plain"
      placeholder="Your Name"
      name="name"
      label="Name"
      type="text"
      v-model="data.name"
      required />

              <v-text-field  hide-details
                density="compact"
                class=" elevation-2 my-5 pt-2 pl-3 rounded"
                color="info"
                variant="plain"
                placeholder="********"
                name="newPassword"
                label="New Password"
                type="password"
                v-model="data.newPassword"
                required />

                <v-text-field  hide-details
                  density="compact"
                  class=" elevation-2 my-5 pt-2 pl-3 rounded"
                  color="info"
                  variant="plain"
                  placeholder="********"
                  name="newPasswordAgain"
                  label="Confirm New Password"
                  type="password"
                  v-model="data.newPasswordAgain"
                  required />

                  <v-checkbox
               label="info"
               color="info"
               value="I am human"
               hide-details
             ></v-checkbox>

              <v-btn color="info" @click="$emit('buttonEvent',{token:route.query.token,...data})">{{props.formData.text}}</v-btn>
              <button hidden @click.enter.prevent="$emit('buttonEvent',{token:route.query.token,...data})" />
              <div>
<p class="mt-4">We have sent you an e-mail with instructions on how to reset
your password. Please check your inbox.</p>
<v-btn color="white" class="mt-4" >continue</v-btn>
</div>
            </v-card-text>

            </v-card>
        </v-form>
</template>
