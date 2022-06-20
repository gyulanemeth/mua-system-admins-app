<script setup>

const data = [
  {email:"user1@gmail.com" , name:"user1"},
  {email:"user2@gmail.com" , name:"user2"},
  {email:"user3@gmail.com" , name:"user3",invitationAccepted:false},
  {email:"user4@gmail.com" , name:"user4",invitationAccepted:false },
  {email:"user5@gmail.com" , name:"user5"},
  {email:"user6@gmail.com" , name:"user6"},
  {email:"user7@gmail.com" , name:"user7"},
  {email:"user8@gmail.com" , name:"user8", },

]


</script>

<template>
  <v-container>
    <v-row class="text-center" justify="center">
  <v-col cols="12">
  <v-table>
    <thead>
      <tr>
        <th class="text-center">
        Name
        </th>
        <th class="text-center">
          Email
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"
        :key="item._id"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.email }}
          <p v-if="item.invitationAccepted === false"> invitation not Accepted yet </p>
        </td>
      </tr>
    </tbody>
  </v-table>
</v-col>
</v-row >
</v-container>
</template>
<style scoped>
  p{
    color:red
  }
</style>
