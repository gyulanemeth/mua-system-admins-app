<script setup >
import { ref } from 'vue'

const props = defineProps({
  name: String
})

const name = ref(props.name)
const editemood = ref()

</script>

<template>

         <v-layout class="d-flex flex-wrap">
           <v-col cols="8" class="pt-3">
           <h3 class="font-weight-bold">My Details</h3>
           <v-divider />

           <v-row align="center" class="mt-3">
               <v-col>
                   <p class="font-weight-bold">Name</p>
               </v-col>
                 <v-text-field  hide-details density="compact" :disabled='!editemood'  color="info" variant="underlined" placeholder="User Name" name="name" v-model="name" type="text" required />
                 <template v-if='editemood'>
                          <v-btn color="info" variant="text" icon="mdi-check" size="small" @click.stop="$emit('submit', {data:name,operation:'updateName'});editemood = false" />
                          <v-btn class="ml-2" color="red" variant="text" icon="mdi-window-close" size="small"  @click='editemood = false' />
                  </template>
                  <template v-else>
                    <v-btn color="info" variant="text" class="ma-2"  icon="mdi-pencil-outline" size="small" @click='editemood = true'  />
                  </template>

             </v-row>

             </v-col >

         <v-col cols="4" class="pt-3">
         <h3 class="font-weight-bold">Profile picture</h3>
         <v-divider/>
          <v-col align="center" class="mt-3">
             <v-hover v-slot="{ isHovering, props }">
         <v-avatar  v-bind="props" class="shadow " size="180" >
           <v-img
           src="https://selective.agency/wp-content/uploads/2018/02/placeholder-600x300.jpg"
            class="align-self-stretch"
           cover
           />

           <v-expand-transition>

             <v-container  v-if="isHovering"  class="d-flex justify-center align-end  v-card--reveal ">
                   <v-btn v-if="false" color="white" variant="text" icon="mdi-delete-forever-outline" size="small" />
                   <v-btn v-else color="white" variant="text" icon="mdi-camera-plus-outline" size="small" />
             </v-container>

           </v-expand-transition>

         </v-avatar>
       </v-hover >
       </v-col>
         </v-col >
         </v-layout>
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
