<template>
  <v-container>
    <p>Admin page</p>
    <v-text-field
      v-model="email"
      label="아이디"
    ></v-text-field>
    <v-btn @click="addAdmin">추가</v-btn>
    <v-btn @click="checkAdmin">체크</v-btn>
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
    addAdmin() {
      this.$store.dispatch('addAdmin', this.email)
    },
    checkAdmin() {
      console.log(this.$store.state.permission)
    }
  },
  created() {
    if (!this.$store.getters.isAdmin) {
      this.$router.push({name: 'home'})
    }
  }
}
</script>