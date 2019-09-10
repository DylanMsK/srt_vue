<template>
  <v-container>
    <p>Admin page</p>
    <v-text-field
      v-model="email"
      label="아이디"
    ></v-text-field>
    <v-btn>추가</v-btn>
    <v-btn>체크</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      email: '',
    }
  },
  methods: {
  },
  created() {
  }
}
</script>