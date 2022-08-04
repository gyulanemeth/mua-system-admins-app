<script setup >

const props = defineProps({
  data: Object
})

</script>

<template>

<v-container>
    <v-row class="text-center" justify="center">
        <v-col cols="6">
            <v-col>
                <h1>Admin Details</h1>
            </v-col>
            <v-card>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="150px" cover></v-img>
                <v-card-title>
                    {{props.data.name}}
                    <v-card-subtitle>
                        - {{props.data.email}}
                    </v-card-subtitle>
                </v-card-title>
                <v-card-actions>
                    <v-btn color="primary" to="/update-name">Update Name</v-btn>
                    <v-btn color="primary" to="/update-password">Update Password</v-btn>
                    <v-btn color="primary" to="/update-email">Update Email</v-btn>

                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>

</template>
