<template>
  <v-app-bar app flat color="#fafafa" class="py-0 px-sm-12">
    <!-- <v-toolbar-title><router-link class="home" to="/">SRTicket</router-link></v-toolbar-title> -->
    <v-toolbar-title @click="goTo('home')">SRTicket</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <template v-if="isAuthenticated">
        <v-btn v-if="isAdmin" text @click="goTo('admin')">관리자</v-btn>
        <v-btn v-if="isAdmin" text @click="checkUser">체크유저</v-btn>
        <v-btn text @click="signout">로그아웃</v-btn>
      </template>
    </v-toolbar-items>

  </v-app-bar>
</template>


<script>
import router from '@/router'

export default {
  name: "Header",
  methods: {
    goTo(pathName) {
      // eslint-disable-next-line
      router.push({name: pathName}).catch(err => {})
    },
    signout() {
      this.$store.dispatch('userSignout')
    },
    checkUser() {
      console.log(this.$store.getters.getUser)
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  }
}
</script>

<style scoped>
.home {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87)
}
</style>
