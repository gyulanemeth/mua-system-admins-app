<script setup>
import { ref } from 'vue'

const props = defineProps({
  formData: Object
})

const data = ref('')
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
  <v-card class="ma-2 pa-2  rounded-xl cardShadow">
    <v-card-text align="center">
      <h4 class="m-4 " >{{props.formData.text}}</h4>

              <v-text-field  hide-details
                density="compact"
              class="inputShadow my-5 pt-2 pl-3 rounded"
                color="info"
                variant="plain"
                placeholder="your@email.com"
                :name="props.formData.inputText"
                :label="props.formData.inputText"
                :type="props.formData.inputType"
                v-model="data"
                required />
                <v-checkbox v-if="props.formData.text === 'Password recovery'"
             label="info"
             color="info"
             value="I am human"
             hide-details
           ></v-checkbox>
                <v-btn color="info" @click="$emit('buttonEvent',data)">{{props.formData.text}}</v-btn>
              <button hidden @click.enter.prevent="$emit('buttonEvent',data)" />
              <v-div>
<p class="mt-4">We have sent you an e-mail with instructions on how to reset
your password. Please check your inbox.</p>
<v-btn color="white" class="mt-4" @click="$emit('buttonEvent',data)">continue</v-btn>
</v-div>
            </v-card-text>

            </v-card>
        </v-form>
</template>

<style scoped>

.cardShadow {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.25);
  width: 30%;
}
.inputShadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);
}

</style>
