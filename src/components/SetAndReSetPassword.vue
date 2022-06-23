<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import stores from '../stores/index.js'

const props = defineProps({
  formData: Object
})

const route = useRoute()
const newPassword = ref('')
const newPasswordAgain = ref('')


</script>


<template>
  <v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="6">
        <form>
          <v-col>
            <h1>{{props.formData.text}}</h1>
          </v-col>
          <v-col>
              <v-text-field
                name="newPassword"
                label="New Password"
                id="newPassword"
                type="password"
                v-model="newPassword"
                required></v-text-field>

              <v-text-field
                name="newPasswordAgain"
                label="New Password Again"
                id="newPasswordAgain"
                type="password"
                v-model="newPasswordAgain"
                required></v-text-field>
            </v-col>
            <v-col>
              <v-btn color="primary" @click="$emit('buttonEvent',{token:route.query.token,newPassword:newPassword,newPasswordAgain:newPasswordAgain})">{{props.formData.text}}</v-btn>
            </v-col>

        </form>
      </v-col>
    </v-row >
  </v-container>
</template>
